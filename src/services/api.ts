
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

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
      const response = await fetch(`${API_URL}/api/users/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          return { valid: false };
        }
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to verify user');
      }
      
      return response.json();
    } catch (error) {
      console.error('Error verifying user:', error);
      throw error;
    }
  }
};
