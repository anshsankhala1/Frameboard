import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';

// Load environment variables
dotenv.config();

// Debug: Log if API key is loaded
console.log('ANTHROPIC_API_KEY loaded:', process.env.ANTHROPIC_API_KEY ? 'YES' : 'NO');

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

// Special handling for Stripe webhooks - must be before express.json()
import stripeRoutes from './api/stripe.routes';
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeRoutes);

// JSON parsing for all other routes
app.use(express.json());

// Routes
import authRoutes from './api/auth.routes';
import callsheetRoutes from './api/callsheet.routes';
import storyboardRoutes from './api/storyboard.routes';
import aiRoutes from './api/ai.routes';
import projectsRoutes from './api/projects.routes';

app.use('/api/auth', authRoutes);
app.use('/api/callsheet', callsheetRoutes);
app.use('/api/storyboard', storyboardRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/stripe', stripeRoutes);
// TODO: Add other routes when implemented
// app.use('/api/scheduling', require('./api/scheduling'));
// app.use('/api/crew', require('./api/crew'));
// app.use('/api/legal', require('./api/legal'));

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
httpServer.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Connect to MongoDB
  try {
    await connectDB();
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    console.error('Server will continue running but database operations will fail');
  }
});
