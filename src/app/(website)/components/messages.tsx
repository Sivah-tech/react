<<<<<<< HEAD
// ChatComponent.tsx

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
=======
import React, { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.42:8000");
>>>>>>> e60b61abfc6d1f8a29b97b491964dbd7d7f106fa

const socket = io('http://192.168.1.8:8000');  // Connect to the Socket.IO server

const ChatComponent = () => {
  const [roomId, setRoomId] = useState<string>('room1');  // Room ID, you can change it dynamically
  const [userId, setUserId] = useState<string>('user1'); // Example userId, could be from login
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

<<<<<<< HEAD
  // Join the room when the component mounts
=======
  // useCallback to avoid the ESLint warning for missing dependency
  const handleReceiveOffer = useCallback(
    async (offer: any, senderId: string) => {
      setIsReceivingCall(true);
      createPeerConnection();
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer));

      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer as RTCSessionDescription);

      socket.emit("send_answer", answer, roomId); // Send the answer back to the offerer
    },
    [roomId] // Dependency on roomId
  );

  const handleReceiveAnswer = (answer: any) => {
    peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleReceiveICECandidate = (candidate: RTCIceCandidate) => {
    peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
  };

>>>>>>> e60b61abfc6d1f8a29b97b491964dbd7d7f106fa
  useEffect(() => {
    socket.emit('join_room', roomId);  // Join the room
    console.log(`${userId} joined room: ${roomId}`);

    // Listen for messages in the room
    socket.on('receive_message', (data: { userId: string; message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);  // Update the messages state
    });

    return () => {
      socket.off('receive_message');  // Cleanup when component unmounts
    };
  }, [handleReceiveOffer, roomId]); // Added handleReceiveOffer and roomId to the dependency array

<<<<<<< HEAD
  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('send_message', roomId, message);  // Emit message to the room
      setMessage('');  // Clear input field
    }
  };

  const handleChangeRoom = (newRoomId: string) => {
    // Leave the previous room and join a new one
    socket.emit('leave_room', roomId); // Leave the current room
    setRoomId(newRoomId); // Change the room
    socket.emit('join_room', newRoomId); // Join the new room
=======
  const createPeerConnection = () => {
    peerConnection.current = new RTCPeerConnection();

    // Add local stream to peer connection
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, localStream.current);
      });
    }

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

  // Start a call (create offer)
  const handleCall = async () => {
    createPeerConnection();
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer as RTCSessionDescription);

    socket.emit("send_offer", offer, roomId); // Send the offer to the room
    setIsCalling(true);
>>>>>>> e60b61abfc6d1f8a29b97b491964dbd7d7f106fa
  };

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.userId}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendMessage}>Send</button>
      <button onClick={() => handleChangeRoom('room2')}>Switch to Room 2</button>
    </div>
  );
};

export default ChatComponent;
