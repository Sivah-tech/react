import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const VideoCall = () => {
  const [roomId, setRoomId] = useState("room1"); // Example roomId
  const [isCalling, setIsCalling] = useState(false);
  const [isReceivingCall, setIsReceivingCall] = useState(false);
  const [callEstablished, setCallEstablished] = useState(false);
  const [socket, setSocket] = useState<any>(null);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteStream = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Create socket connection
    const newSocket = io("https://node-backend-ehsw.onrender.com");
    setSocket(newSocket);

    // Initialize media and join room
    const initialize = async () => {
      try {
        // Request video and audio permission
        localStream.current = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Set local video
        if (localVideoRef.current && localStream.current) {
          localVideoRef.current.srcObject = localStream.current;
        }

        // Join the room after getting media
        newSocket.emit("join_room", roomId);
      } catch (err) {
        console.error("Error accessing media devices:", err);
        alert("Could not access camera and/or microphone.");
      }
    };

    initialize();

    // Cleanup function
    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [roomId]);

  // Setup socket event listeners when socket is available
  useEffect(() => {
    if (!socket) return;

    // Listen for incoming offers
    socket.on("receive_offer", handleReceiveOffer);
    socket.on("receive_answer", handleReceiveAnswer);
    socket.on("receive_ice_candidate", handleReceiveICECandidate);

    return () => {
      socket.off("receive_offer");
      socket.off("receive_answer");
      socket.off("receive_ice_candidate");
    };
  }, [socket]);

  const createPeerConnection = () => {
    // Configure ICE servers
    const configuration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" }
      ]
    };

    peerConnection.current = new RTCPeerConnection(configuration);

    // Add local stream to peer connection
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        if (localStream.current && peerConnection.current) {
          peerConnection.current.addTrack(track, localStream.current);
        }
      });
    }

    // Handle remote stream
    peerConnection.current.ontrack = (event) => {
      console.log("Remote track received");
      if (event.streams && event.streams[0]) {
        remoteStream.current = event.streams[0];
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream.current;
          setCallEstablished(true);
        }
      }
    };

    // ICE Candidate handling
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate && socket) {
        console.log("Sending ICE candidate");
        socket.emit("send_ice_candidate", event.candidate, roomId);
      }
    };

    // Connection state change
    peerConnection.current.onconnectionstatechange = () => {
      console.log("Connection state:", peerConnection.current?.connectionState);
      if (peerConnection.current?.connectionState === "connected") {
        console.log("Peers connected!");
      }
    };

    return peerConnection.current;
  };

  // Handle incoming offer
  const handleReceiveOffer = async (offer: RTCSessionDescriptionInit, senderId: string) => {
    console.log("Received offer", offer);
    setIsReceivingCall(true);
    
    const pc = createPeerConnection();
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      if (socket) {
        console.log("Sending answer");
        socket.emit("send_answer", answer, roomId);
      }
    } catch (error) {
      console.error("Error handling offer:", error);
    }
  };

  // Handle incoming answer
  const handleReceiveAnswer = async (answer: RTCSessionDescriptionInit) => {
    console.log("Received answer", answer);
    try {
      if (peerConnection.current && peerConnection.current.signalingState !== "stable") {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    } catch (error) {
      console.error("Error handling answer:", error);
    }
  };

  // Handle incoming ICE candidate
  const handleReceiveICECandidate = async (candidate: RTCIceCandidateInit) => {
    console.log("Received ICE candidate", candidate);
    try {
      if (peerConnection.current) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  };

  // Start a call (create offer)
  const handleCall = async () => {
    if (!socket) return;
    
    console.log("Starting call");
    setIsCalling(true);
    
    const pc = createPeerConnection();
    try {
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });
      await pc.setLocalDescription(offer);
      
      console.log("Sending offer");
      socket.emit("send_offer", offer, roomId);
    } catch (error) {
      console.error("Error creating offer:", error);
      setIsCalling(false);
    }
  };

  // Answer an incoming call
  const handleAnswer = async () => {
    setIsReceivingCall(false);
    setIsCalling(true);
    // The actual answer logic is in handleReceiveOffer
  };

  return (
    <div className="video-call-container">
      <h2>Room: {roomId}</h2>

      <div className="video-grid">
        <div className="video-wrapper">
          <label>Your Video</label>
          <video 
            ref={localVideoRef} 
            autoPlay 
            muted 
            playsInline 
            className="video-element" 
          />
        </div>
        
        <div className="video-wrapper">
          <label>Remote Video</label>
          <video 
            ref={remoteVideoRef} 
            autoPlay 
            playsInline 
            className="video-element" 
          />
        </div>
      </div>

      <div className="controls">
        {!callEstablished && !isCalling && !isReceivingCall && (
          <button className="call-button" onClick={handleCall}>Start Call</button>
        )}

        {isReceivingCall && !isCalling && (
          <div className="incoming-call">
            <p>Incoming call...</p>
            <button className="answer-button" onClick={handleAnswer}>Answer</button>
          </div>
        )}
        
        {callEstablished && (
          <p className="status-text">Call in progress</p>
        )}
      </div>
      
      <style jsx>{`
        .video-call-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .video-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .video-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .video-element {
          width: 100%;
          max-width: 400px;
          height: auto;
          background-color: #222;
          border-radius: 8px;
        }
        
        .controls {
          display: flex;
          justify-content: center;
          margin-top: 20px;
        }
        
        button {
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        
        .call-button {
          background-color: #28a745;
          color: white;
          border: none;
        }
        
        .answer-button {
          background-color: #007bff;
          color: white;
          border: none;
        }
        
        .incoming-call {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .status-text {
          font-weight: bold;
          color: #28a745;
        }
      `}</style>
    </div>
  );
};

export default VideoCall;
