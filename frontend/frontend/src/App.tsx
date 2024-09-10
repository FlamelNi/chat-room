// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import socket from "./socket";

// Define the type for the message object
type Message = {
  sender: string;
  message: string;
};

function App() {
  // Set the initial state as an array of Message objects
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("new_message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Cleanup function
    return () => {
      socket.off("new_message"); // Do not return anything, just call socket.off
    };
  }, []);

  const sendMessage = () => {
    socket.emit("chat_message", { sender: "User1", message: input });
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            {msg.sender}: {msg.message}
          </p>
        ))}
      </div>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
