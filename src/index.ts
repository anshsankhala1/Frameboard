import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/storyboard', require('./api/storyboard'));
app.use('/api/scheduling', require('./api/scheduling'));
app.use('/api/crew', require('./api/crew'));
app.use('/api/legal', require('./api/legal'));

// Socket.IO events
io.on('connection', (socket) => {
  console.log('Client connected');
  
  socket.on('script-update', (data) => {
    // Broadcast script changes to all connected clients
    socket.broadcast.emit('script-updated', data);
  });

  socket.on('schedule-update', (data) => {
    // Broadcast schedule changes to all connected clients
    socket.broadcast.emit('schedule-updated', data);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
