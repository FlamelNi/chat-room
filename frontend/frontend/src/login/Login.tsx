// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import socket from "../socket/socket";
import { Button, Form } from "react-bootstrap";

// Define the type for the message object
type Message = {
  sender: string;
  message: string;
};

type Props = {
  login_success: Function;
};

export function Login({ login_success }: Props) {
  // Set the initial state as an array of Message objects
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {}, []);

  const login = () => {
    socket.emit("login", { name: username });
    setUsername("");
    login_success();
  };

  return (
    <div>
      <h3>Login</h3>
      {/* <h4>Username</h4> */}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          {/* <Form.Label>Username</Form.Label> */}
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
        </Form.Group>
        <Button onClick={login}>Login</Button>
      </Form>

      {/* <button onClick={sendMessage}>Send</button> */}
    </div>
  );
}

// export default Chat;
