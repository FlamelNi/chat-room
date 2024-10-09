import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow requests from your React app
    methods: ["GET", "POST"],
  },
});

class User {
  name: string = "";
  socket_id: string = "";

  constructor(socket_id: string, name: string) {
    this.socket_id = socket_id;
    this.name = name;
  }
}

let users: User[] = [];
let find_user_by_id = (id: string) => {
  return users.find((user) => user.socket_id == id);
};

const SYSTEM = "System";

// Enable CORS for Express routes
app.use(cors());

app.use(express.json());

// Real-time chat and user presence using Socket.io
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for chat messages
  socket.on("chat_message", (data: { sender: string; message: string }) => {
    let user = find_user_by_id(socket.id);
    if (user) {
      // Broadcast the message to all connected clients
      io.emit("new_message", { sender: user.name, message: data.message, timestamp: new Date() });
    }
  });

  // login
  socket.on("login", (data: { name: string }) => {
    // Broadcast the message to all connected clients

    let is_name_approved = false;
    do {
      is_name_approved = true;
      if (data.name == SYSTEM) {
        data.name = data.name + "1";
        is_name_approved = false;
      }
      if (data.name in users.map((user) => user.name)) {
        data.name = data.name + "1";
        is_name_approved = false;
      }
    } while (!is_name_approved);

    users.push(new User(socket.id, data.name));
    io.emit("new_message", { sender: SYSTEM, message: `${data.name} has logged in`, timestamp: new Date() });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
