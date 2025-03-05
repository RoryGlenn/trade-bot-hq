
# TradeBot HQ Backend

This is the backend server for TradeBot HQ, which handles user ID generation and verification.

## Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The server will run on http://localhost:3001

## Deploying to Heroku

### Prerequisites

1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed
2. Heroku account

### Deployment Steps

1. Login to Heroku:
   ```
   heroku login
   ```

2. Create a new Heroku app:
   ```
   heroku create tradebot-hq-backend
   ```

3. Deploy to Heroku:
   ```
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

4. Open the app:
   ```
   heroku open
   ```

5. Set your environment variables in the frontend to point to the Heroku URL:
   ```
   VITE_API_URL=https://your-heroku-app-name.herokuapp.com
   ```

## Notes

- The current implementation uses in-memory storage, which means data is lost when the server restarts. For production, replace with a proper database.
- For a more robust solution, consider adding authentication and rate limiting.
