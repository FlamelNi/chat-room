// frontend/src/socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to your backend

export default socket;
