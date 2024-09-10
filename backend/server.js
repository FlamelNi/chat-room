const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import CORS middleware
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",  // Allow requests from your React app
    methods: ["GET", "POST"]
  }
});

// Enable CORS for Express routes
app.use(cors());

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Authentication Routes
app.use('/api/auth', authRoutes);

// Chat Routes
app.use('/api/chat', chatRoutes);

// Real-time chat and user presence using Socket.io
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('chat_message', (data) => {
    io.emit('new_message', { sender: data.sender, message: data.message, timestamp: new Date() });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


//https://www.creative-tim.com/product/vite-soft-ui-dashboard
