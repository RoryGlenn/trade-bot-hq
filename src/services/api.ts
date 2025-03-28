import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiService = {
  // Create a new user and get a unique ID
  async createUser(): Promise<{ userId: string }> {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  // Verify if a user ID exists
  async verifyUser(userId: string): Promise<{ valid: boolean }> {
    try {
      const response = await axios.post(`${API_URL}/verify-user`, { userId });
      return response.data;
    } catch (error) {
      console.error('Error verifying user:', error);
      throw error;
    }
  },

  // Get dashboard data for a specific user
  async getDashboardData(userId: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/api/dashboard?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch dashboard data');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Return default data if there's an error
      return {
        activeBots: 0,
        totalProfit: 0,
        totalTransactions: 0,
        walletBalance: 0,
        bots: [],
        transactions: []
      };
    }
  },

  // Get bots data for a specific user
  async getUserBots(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/api/bots?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch user bots');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error fetching user bots:', error);
      throw error;
    }
  }
};
