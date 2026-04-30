require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');

const seedDB = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash('123456', salt);
      const demoUser = await User.create({ 
        username: 'DemoUser', 
        email: 'demo@socio.com', 
        password,
        about: 'This is a demo account automatically created for testing.' 
      });
      
      await Post.create({
        userId: demoUser._id,
        fileType: 'text',
        description: 'Hello world! 🌍 This is the first post on SocialeX. Loving the new glassmorphism UI! 🚀',
        likes: [],
        comments: []
      });
      console.log('Database seeded with demo user and post!');
    }
  } catch (error) {
    console.error('Error seeding DB:', error);
  }
};

// Connect to database
connectDB().then(() => seedDB());

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/chats', require('./routes/chatRoutes'));

// Basic Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
