-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  user_id VARCHAR(16) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bots table
CREATE TABLE bots (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  token_address VARCHAR(255) NOT NULL,
  quantity DECIMAL(18, 8) NOT NULL,
  slippage DECIMAL(5, 2) NOT NULL,
  priority_fee DECIMAL(10, 2) NOT NULL,
  gas_limit INTEGER,
  max_gas INTEGER,
  stop_loss DECIMAL(5, 2),
  take_profit DECIMAL(5, 2),
  custom_rpc VARCHAR(255),
  status VARCHAR(50) DEFAULT 'inactive',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- API Keys (encrypted)
CREATE TABLE api_keys (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  exchange VARCHAR(100) NOT NULL,
  encrypted_api_key BYTEA NOT NULL,
  encrypted_api_secret BYTEA NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, exchange)
);

-- Transactions
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  bot_id INTEGER NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  transaction_hash VARCHAR(255),
  token_address VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,  -- 'buy', 'sell'
  amount DECIMAL(18, 8) NOT NULL,
  price DECIMAL(18, 8) NOT NULL,
  gas_used DECIMAL(18, 8),
  status VARCHAR(50) NOT NULL, -- 'pending', 'completed', 'failed'
  executed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bot Performance
CREATE TABLE bot_performance (
  id SERIAL PRIMARY KEY,
  bot_id INTEGER NOT NULL REFERENCES bots(id) ON DELETE CASCADE,
  total_profit_loss DECIMAL(18, 8) DEFAULT 0,
  total_transactions INTEGER DEFAULT 0,
  successful_transactions INTEGER DEFAULT 0,
  failed_transactions INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_bots_user_id ON bots(user_id);
CREATE INDEX idx_transactions_bot_id ON transactions(bot_id);
CREATE INDEX idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX idx_bot_performance_bot_id ON bot_performance(bot_id); 