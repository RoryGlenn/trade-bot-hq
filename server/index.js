
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for user IDs
// In a production app, this would be a database
const users = new Map();

// In-memory storage for user dashboard data
// This would be in a database in a real application
const userDashboards = new Map();

// Generate a 16-character ID
const generateId = () => {
  // Use first 16 characters of a UUID (without hyphens)
  return uuidv4().replace(/-/g, '').substring(0, 16);
};

// Generate demo data for a new user
const generateDemoData = (userId) => {
  // Random data for demonstration
  const botsCount = Math.floor(Math.random() * 3) + 1; // 1-3 bots
  const profit = Math.floor(Math.random() * 2000) + 200; // $200-$2200
  const walletBalance = (Math.random() * 5 + 1).toFixed(2); // 1-6 ETH
  
  // Generate random bots
  const bots = [];
  const botNames = ["ETH Trading Bot", "SOL Sniper", "BTC Hunter", "DOGE Trader"];
  const tokenAddresses = [
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
  ];
  
  for (let i = 0; i < botsCount; i++) {
    const transactions = Math.floor(Math.random() * 100) + 10;
    bots.push({
      id: `bot-${i+1}-${userId.substring(0, 4)}`,
      name: botNames[Math.floor(Math.random() * botNames.length)],
      status: Math.random() > 0.3 ? "active" : "paused",
      tokenAddress: tokenAddresses[Math.floor(Math.random() * tokenAddresses.length)],
      profit: Math.random() > 0.7 ? -1 * (Math.random() * 10).toFixed(1) : (Math.random() * 20).toFixed(1),
      transactions: transactions,
      createdAt: `${Math.floor(Math.random() * 7) + 1} days ago`
    });
  }
  
  // Generate random transactions
  const transactions = [];
  const txCount = Math.floor(Math.random() * 5) + 3; // 3-7 transactions
  
  for (let i = 0; i < txCount; i++) {
    const bot = bots[Math.floor(Math.random() * bots.length)];
    const isBuy = Math.random() > 0.5;
    const token = bot.name.includes("ETH") ? "ETH" : bot.name.includes("SOL") ? "SOL" : "BTC";
    const amount = (Math.random() * (token === "ETH" ? 2 : token === "SOL" ? 200 : 0.5)).toFixed(2);
    
    transactions.push({
      id: `tx-${i+1}-${userId.substring(0, 4)}`,
      botName: bot.name,
      type: isBuy ? "buy" : "sell",
      amount: `${amount} ${token}`,
      token: token,
      tokenAddress: bot.tokenAddress.substring(0, 6) + "..." + bot.tokenAddress.substring(bot.tokenAddress.length - 4),
      date: `${Math.floor(Math.random() * 24) + 1} hours ago`,
      status: Math.random() > 0.2 ? "completed" : Math.random() > 0.5 ? "pending" : "failed"
    });
  }
  
  return {
    activeBots: bots.filter(b => b.status === "active").length,
    totalProfit: profit,
    totalTransactions: transactions.length,
    walletBalance: parseFloat(walletBalance),
    bots,
    transactions
  };
};

// Routes
// Create a new user
app.post('/api/users', (req, res) => {
  const userId = generateId();
  
  // Store the user
  users.set(userId, { created: new Date() });
  
  // Generate some demo dashboard data
  userDashboards.set(userId, generateDemoData(userId));
  
  res.status(201).json({ userId });
  console.log(`Created new user with ID: ${userId}`);
});

// Verify a user
app.post('/api/users/verify', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  // Check if the user exists
  if (users.has(userId)) {
    return res.status(200).json({ valid: true });
  }
  
  return res.status(404).json({ valid: false });
});

// Get dashboard data for a user
app.get('/api/dashboard', (req, res) => {
  const { userId } = req.query;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  // Check if the user exists
  if (!users.has(userId)) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Get user's dashboard data, or generate some if it doesn't exist yet
  if (!userDashboards.has(userId)) {
    userDashboards.set(userId, generateDemoData(userId));
  }
  
  return res.status(200).json(userDashboards.get(userId));
});

// Root route for Heroku
app.get('/', (req, res) => {
  res.send('TradeBot HQ API is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
