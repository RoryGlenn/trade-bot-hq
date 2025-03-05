
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage (replace with a database in production)
const users = [];

// Routes
app.post('/api/users', (req, res) => {
  try {
    const userId = req.body.userId || generateUserId();
    
    // Check if user already exists
    const existingUser = users.find(user => user.id === userId);
    if (existingUser) {
      return res.status(400).json({ error: 'User ID already exists' });
    }
    
    // Create new user
    const newUser = {
      id: userId,
      createdAt: new Date()
    };
    
    users.push(newUser);
    
    return res.status(201).json({ userId: newUser.id });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
});

app.post('/api/users/verify', (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    // Find user by ID
    const user = users.find(user => user.id === userId);
    
    if (user) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(404).json({ valid: false });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return res.status(500).json({ error: 'Failed to verify user' });
  }
});

// Helper function to generate a random 16-character ID
function generateUserId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// For Heroku deployment - handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
