export interface Notification {
  id: string;
  type: 'email' | 'linkedin' | 'twitter' | 'github' | 'instagram' | 'whatsapp';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  link?: string;
  avatar?: string;
}