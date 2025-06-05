import React from 'react';
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  Github, 
  Instagram, 
  Phone
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Notification } from '../../types/notification';
import { useNotifications } from '../../hooks/useNotifications';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { markAsRead } = useNotifications();

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (notification.link) {
      window.open(notification.link, '_blank');
    }
  };

  const getIcon = () => {
    const iconClass = "h-5 w-5";
    
    switch (notification.type) {
      case 'email':
        return <Mail className={`${iconClass} text-blue-600`} />;
      case 'twitter':
        return <Twitter className={`${iconClass} text-blue-400`} />;
      case 'linkedin':
        return <Linkedin className={`${iconClass} text-blue-700`} />;
      case 'github':
        return <Github className={`${iconClass} text-gray-800 dark:text-gray-200`} />;
      case 'instagram':
        return <Instagram className={`${iconClass} text-pink-500`} />;
      case 'whatsapp':
        return <Phone className={`${iconClass} text-green-500`} />;
      default:
        return null;
    }
  };

  const timeAgo = notification.timestamp ? 
    formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true }) : 
    '';

  return (
    <div 
      onClick={handleClick}
      className={`p-4 cursor-pointer ${
        notification.read ? 'bg-transparent' : 'bg-blue-50 dark:bg-blue-900/20'
      } hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors`}
    >
      <div className="flex">
        <div className="flex-shrink-0 mr-3">
          {notification.avatar ? (
            <img
              src={notification.avatar}
              alt={notification.title}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              {getIcon()}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {notification.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
              {timeAgo}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {notification.message}
          </p>
          
          {notification.link && (
            <div className="mt-2">
              <span className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                View details
              </span>
            </div>
          )}
        </div>
        
        {!notification.read && (
          <div className="ml-3 flex-shrink-0">
            <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;