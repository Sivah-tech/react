import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.42:8000");

const VideoCall = () => {
  const [roomId, setRoomId] = useState("room1"); // Example roomId
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Connect to the room
    socket.emit("join_room", roomId);

    // Get user media (video/audio stream)
    const getUserMedia = async () => {
      try {
        // Request video and audio permission
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Check if the video and audio tracks are available
        if (localStream.current) {
          console.log("Local stream obtained");
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream.current;
          }
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        alert("Could not access camera and/or microphone.");
      }
    };

    getUserMedia();

    // Listen for incoming calls (offer)
    socket.on("receive_offer", handleReceiveOffer);
    socket.on("receive_answer", handleReceiveAnswer);
    socket.on("receive_ice_candidate", handleReceiveICECandidate);

    return () => {
      socket.off("receive_offer", handleReceiveOffer);
      socket.off("receive_answer", handleReceiveAnswer);
      socket.off("receive_ice_candidate", handleReceiveICECandidate);
    };
  }, [roomId]);

  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection();

    // Add local stream to peer connection
    localStream.current?.getTracks().forEach((track) => {
      peerConnection.current?.addTrack(track, localStream.current);
    });

    // Handle remote stream
    peerConnection.current.ontrack = (event) => {
      remoteStream.current = event.streams[0];
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStream.current;
      }
    };

    // ICE Candidate handling
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("send_ice_candidate", event.candidate, roomId);
      }
    };
  };

  // Handle incoming offer
  const handleReceiveOffer = async (offer: any, senderId: string) => {
    setIsReceivingCall(true);
    createPeerConnection();
    await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await peerConnection.current?.createAnswer();
    await peerConnection.current?.setLocalDescription(answer as RTCSessionDescription);

    socket.emit("send_answer", answer, roomId); // Send the answer back to the offerer
  };

  // Handle incoming answer
  const handleReceiveAnswer = (answer: any) => {
    peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  // Handle incoming ICE candidate
  const handleReceiveICECandidate = (candidate: RTCIceCandidate) => {
    peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
  };

  // Start a call (create offer)
  const handleCall = async () => {
    createPeerConnection();
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer as RTCSessionDescription);

    socket.emit("send_offer", offer, roomId); // Send the offer to the room
    setIsCalling(true);
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>

      <div>
        <video ref={localVideoRef} autoPlay muted width="300" />
        <video ref={remoteVideoRef} autoPlay width="300" />
      </div>

      {!isCalling && !isReceivingCall && (
        <button onClick={handleCall}>Start Call</button>
      )}

      {isReceivingCall && !isCalling && (
        <div>
          <p>Incoming call...</p>
          <button onClick={handleCall}>Answer</button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
