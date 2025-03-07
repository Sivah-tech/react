// ChatComponent.tsx

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://192.168.1.8:8000');  // Connect to the Socket.IO server

const ChatComponent = () => {
  const [roomId, setRoomId] = useState<string>('room1');  // Room ID, you can change it dynamically
  const [userId, setUserId] = useState<string>('user1'); // Example userId, could be from login
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);

  // Join the room when the component mounts
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
  }, [roomId]);

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
