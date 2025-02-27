import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSession } from "next-auth/react";
import ChatRoom from './chatroom';
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL);  // Ensure it matches the protocol
// next-auth.d.ts or your custom type declaration file
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      fullName: string
    } & DefaultSession["user"]
  }
}



const ChatComponent = () => {
  const [roomId, setRoomId] = useState<string>('room1');  // Room ID
  const [message, setMessage] = useState('');  // Message input state
  const [messages, setMessages] = useState<any[]>([]);  // List of messages
  const { data: session } = useSession();  // Get session data from NextAuth
  console.log(session?.user);

  // Get user ID from session
  const userId = session?.user?.fullName || 'defaultUser';  // Default to 'defaultUser' if no ID is available

  useEffect(() => {
    if (session) {
      // Emit user ID to the backend as soon as the session is available
      socket.emit('set_user_id', userId);
    }

    socket.emit('join_room', roomId);  // Join the room
    console.log(`${userId} joined room: ${roomId}`);

    // Listen for messages in the room
    socket.on('receive_message', (data: { userId: string; message: string }) => {
      setMessages((prevMessages) => [...prevMessages, data]);  // Update the messages state
    });

    // Cleanup when component unmounts
    return () => {
      socket.off('receive_message');
    };
  }, [roomId, session, userId]);

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Emit message to the room with userId and message
      socket.emit('send_message', roomId, message);
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
      <ChatRoom
        roomId={roomId}
        messages={messages}
        message={message}
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        currentUser={userId}
      />
    </div>
  );
};

export default ChatComponent;
