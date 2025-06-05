import { User, LoginCredentials, SignUpCredentials } from '../types/auth';

// Simulated user data
const MOCK_USER: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  connectedAccounts: [
    { platform: 'twitter', username: 'johndoe', connected: true },
    { platform: 'linkedin', username: 'johndoe', connected: true },
    { platform: 'github', username: 'johndoe', connected: true },
    { platform: 'instagram', username: 'johndoe', connected: false },
    { platform: 'whatsapp', username: '+1234567890', connected: false },
  ],
};

// Simulated API call for login
export const mockLogin = async (credentials: LoginCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any credentials with proper format
      if (!credentials.email || !credentials.password) {
        reject(new Error('Email and password are required'));
        return;
      }
      
      if (!credentials.email.includes('@')) {
        reject(new Error('Invalid email format'));
        return;
      }
      
      if (credentials.password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }
      
      resolve(MOCK_USER);
    }, 1000); // Simulate network delay
  });
};

// Simulated API call for signup
export const mockSignUp = async (credentials: SignUpCredentials): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // For demo purposes, accept any credentials with proper format
      if (!credentials.name || !credentials.email || !credentials.password) {
        reject(new Error('All fields are required'));
        return;
      }
      
      if (!credentials.email.includes('@')) {
        reject(new Error('Invalid email format'));
        return;
      }
      
      if (credentials.password.length < 6) {
        reject(new Error('Password must be at least 6 characters'));
        return;
      }
      
      resolve({
        ...MOCK_USER,
        name: credentials.name,
        email: credentials.email
      });
    }, 1000); // Simulate network delay
  });
};

// Simulated API call for logout
export const mockLogout = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500); // Simulate network delay
  });
};