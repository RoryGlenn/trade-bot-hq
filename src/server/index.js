const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// Routes
// User verification (for login)
app.post('/api/verify-user', async (req, res) => {
  try {
    const { userId } = req.body;
    
    // Check if user exists with this ID
    const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    
    // Return valid=true if user found
    const valid = result.rows.length > 0;
    
    res.json({ valid });
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create user (for signup)
app.post('/api/create-user', async (req, res) => {
  try {
    const { userId, username, email } = req.body;
    
    // Ensure ID is exactly 16 characters
    if (userId.length !== 16) {
      return res.status(400).json({ error: 'User ID must be exactly 16 characters' });
    }
    
    // Check if ID already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE user_id = $1', [userId]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'This ID is already in use' });
    }
    
    // Create new user
    const result = await pool.query(
      'INSERT INTO users (user_id, username, email) VALUES ($1, $2, $3) RETURNING id, user_id, username, email',
      [userId, username, email]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
});

// User login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update the bot creation endpoint to use userId instead of JWT
app.post('/api/bots', async (req, res) => {
  try {
    const { 
      userId,
      name, tokenAddress, quantity, slippage, priorityFee, 
      gasLimit, maxGas, stopLoss, takeProfit, customRpc 
    } = req.body;
    
    // Get the internal database ID for this userId
    const userResult = await pool.query('SELECT id FROM users WHERE user_id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    const dbUserId = userResult.rows[0].id;
    
    const result = await pool.query(
      `INSERT INTO bots 
        (user_id, name, token_address, quantity, slippage, priority_fee, 
         gas_limit, max_gas, stop_loss, take_profit, custom_rpc) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
       RETURNING *`,
      [dbUserId, name, tokenAddress, quantity, slippage, priorityFee, 
       gasLimit, maxGas, stopLoss, takeProfit, customRpc]
    );
    
    // Initialize bot performance record
    await pool.query(
      'INSERT INTO bot_performance (bot_id) VALUES ($1)',
      [result.rows[0].id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating bot:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get User Bots
app.get('/api/bots', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bots WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Keys
app.post('/api/api-keys', authenticateToken, async (req, res) => {
  try {
    const { exchange, apiKey, apiSecret } = req.body;
    
    // In a real implementation, you would encrypt these values
    // This is a simplified example - you should use proper encryption
    
    await pool.query(
      `INSERT INTO api_keys (user_id, exchange, encrypted_api_key, encrypted_api_secret)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (user_id, exchange) 
       DO UPDATE SET encrypted_api_key = $3, encrypted_api_secret = $4`,
      [req.user.id, exchange, Buffer.from(apiKey), Buffer.from(apiSecret)]
    );
    
    res.status(201).json({ message: 'API keys saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 