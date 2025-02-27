import React from "react";

const ChatRoom = ({ roomId, messages, message, setMessage, handleSendMessage, currentUser }:{[key:string]:any}) => {
    // Handle "Enter" key press
    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter' && message.trim() !== '') {
            handleSendMessage();  // Trigger the send message function
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Chat Room: {roomId}</h2>
            <div style={{ maxHeight: '400px', overflowY: 'scroll', marginBottom: '10px' }}>
                {messages.map((msg:any, index:any) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            justifyContent: msg.userId === currentUser ? 'flex-end' : 'flex-start',
                            marginBottom: '10px',
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: msg.userId === currentUser ? '#DCF8C6' : '#f1f1f1',
                                borderRadius: '10px',
                                padding: '10px',
                                maxWidth: '80%',
                                wordBreak: 'break-word',
                            }}
                        >
                            <strong>{msg.userId}</strong>: {msg.message}
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex' }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}  // Detect key presses
                    placeholder="Type a message..."
                    style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginRight: '10px',
                    }}
                />
                <button
                    onClick={handleSendMessage}
                    style={{
                        padding: '10px 20px',
                        borderRadius: '5px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
