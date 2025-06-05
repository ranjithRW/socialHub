import { Notification } from '../types/notification';

// Simulated notifications data
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'email',
    title: 'New Email from Alice',
    message: 'Project update: We need to discuss the new requirements',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString(), // 10 minutes ago
    read: false,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: '2',
    type: 'twitter',
    title: '@techcompany mentioned you',
    message: 'Thanks for the feedback! We are working on it.',
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    read: false,
    link: 'https://twitter.com',
    avatar: 'https://i.pravatar.cc/150?img=22',
  },
  {
    id: '3',
    type: 'linkedin',
    title: 'New connection request',
    message: 'Sarah Miller wants to connect with you on LinkedIn',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
    read: true,
    link: 'https://linkedin.com',
    avatar: 'https://i.pravatar.cc/150?img=27',
  },
  {
    id: '4',
    type: 'github',
    title: 'Pull Request Approved',
    message: 'Your PR #42 was approved by the team lead',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
    read: true,
    link: 'https://github.com',
    avatar: 'https://i.pravatar.cc/150?img=67',
  },
  {
    id: '5',
    type: 'whatsapp',
    title: 'New message from Team Group',
    message: 'When is the next meeting scheduled?',
    timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
    read: false,
    link: 'https://web.whatsapp.com',
  },
  {
    id: '6',
    type: 'instagram',
    title: 'New follower',
    message: '@designer_pro started following you',
    timestamp: new Date(Date.now() - 12 * 3600000).toISOString(), // 12 hours ago
    read: true,
    link: 'https://instagram.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
];

// Simulated API call for fetching notifications
export const fetchMockNotifications = async (): Promise<Notification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Add a random new notification with ~20% probability
      if (Math.random() < 0.2) {
        const platformTypes = ['email', 'twitter', 'linkedin', 'github', 'instagram', 'whatsapp'] as const;
        const randomType = platformTypes[Math.floor(Math.random() * platformTypes.length)];
        
        const newNotification: Notification = {
          id: `new-${Date.now()}`,
          type: randomType,
          title: `New ${randomType} notification`,
          message: `You have a new activity on ${randomType}`,
          timestamp: new Date().toISOString(),
          read: false,
          avatar: Math.random() > 0.5 ? `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}` : undefined,
        };
        
        resolve([newNotification, ...MOCK_NOTIFICATIONS]);
      } else {
        resolve(MOCK_NOTIFICATIONS);
      }
    }, 500); // Simulate network delay
  });
};