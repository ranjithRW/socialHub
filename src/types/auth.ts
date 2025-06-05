export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  connectedAccounts: {
    platform: string;
    username: string;
    connected: boolean;
  }[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}