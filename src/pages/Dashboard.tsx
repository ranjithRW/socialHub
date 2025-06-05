import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Github, Instagram, Phone, ExternalLink } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';

interface FeedItem {
  id: string;
  platform: string;
  content: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');

  // Mock feed data
  const feedItems: FeedItem[] = [
    {
      id: '1',
      platform: 'twitter',
      content: 'Just launched our new product! Check it out at example.com #ProductLaunch #Tech',
      author: 'Tech Company',
      authorAvatar: 'https://i.pravatar.cc/150?img=32',
      timestamp: '2h ago',
      likes: 45,
      comments: 12,
      shares: 8
    },
    {
      id: '2',
      platform: 'linkedin',
      content: 'I\'m excited to share that our team has achieved a major milestone this quarter. Thanks to everyone who contributed!',
      author: 'Jane Smith',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
      timestamp: '4h ago',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 124,
      comments: 35,
      shares: 17
    },
    {
      id: '3',
      platform: 'github',
      content: 'Pull request #42 has been merged into main: "Add new authentication features"',
      author: 'DevTeam',
      timestamp: '6h ago',
      likes: 12,
      comments: 3,
      shares: 0
    },
    {
      id: '4',
      platform: 'instagram',
      content: 'Beautiful sunset view from our office today! #WorkLifeBalance #Sunset',
      author: 'Company Culture',
      authorAvatar: 'https://i.pravatar.cc/150?img=21',
      timestamp: '1d ago',
      image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 387,
      comments: 42,
      shares: 5
    },
    {
      id: '5',
      platform: 'email',
      content: 'Meeting agenda for tomorrow: 1. Project updates 2. Q3 planning 3. Resource allocation',
      author: 'Project Manager',
      authorAvatar: 'https://i.pravatar.cc/150?img=12',
      timestamp: '12h ago',
      likes: 0,
      comments: 3,
      shares: 0
    }
  ];

  const filteredFeed = activeTab === 'all' 
    ? feedItems 
    : feedItems.filter(item => item.platform === activeTab);

  const getPlatformIcon = (platform: string) => {
    const iconClass = "h-5 w-5";
    
    switch (platform) {
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

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main feed */}
        <div className="md:col-span-2 space-y-6">
          <div className="card overflow-hidden">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                    activeTab === 'all'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  All Activity
                </button>
                <button
                  onClick={() => setActiveTab('twitter')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                    activeTab === 'twitter'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Twitter className="h-4 w-4 mr-2" /> Twitter
                </button>
                <button
                  onClick={() => setActiveTab('linkedin')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                    activeTab === 'linkedin'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Linkedin className="h-4 w-4 mr-2" /> LinkedIn
                </button>
                <button
                  onClick={() => setActiveTab('github')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                    activeTab === 'github'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Github className="h-4 w-4 mr-2" /> GitHub
                </button>
                <button
                  onClick={() => setActiveTab('instagram')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                    activeTab === 'instagram'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Instagram className="h-4 w-4 mr-2" /> Instagram
                </button>
                <button
                  onClick={() => setActiveTab('email')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                    activeTab === 'email'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Mail className="h-4 w-4 mr-2" /> Email
                </button>
              </nav>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredFeed.length === 0 ? (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                  No activity found for this platform
                </div>
              ) : (
                filteredFeed.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        {item.authorAvatar ? (
                          <img
                            src={item.authorAvatar}
                            alt={item.author}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            {getPlatformIcon(item.platform)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {item.author}
                            </p>
                            <span className="mx-1 text-gray-500 dark:text-gray-400">•</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {item.timestamp}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getPlatformIcon(item.platform)}
                            <button className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                              <ExternalLink size={16} />
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                          {item.content}
                        </p>
                        
                        {item.image && (
                          <div className="mb-3 rounded-lg overflow-hidden">
                            <img 
                              src={item.image} 
                              alt="Post image" 
                              className="w-full h-auto object-cover"
                              style={{ maxHeight: '300px' }}
                            />
                          </div>
                        )}
                        
                        <div className="flex space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <button className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span>{item.likes}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <span>{item.comments}</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            <span>{item.shares}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User profile card */}
          <div className="card p-6">
            <div className="flex items-center">
              <img
                src={user?.avatar || 'https://i.pravatar.cc/150?img=68'}
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'User'}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Connected Accounts
              </h3>
              {/* <div className="space-y-3">
                {user?.connectedAccounts.map((account) => (
                  <div key={account.platform} className="flex items-center justify-between">
                    <div className="flex items-center">
                      {getPlatformIcon(account.platform)}
                      <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm capitalize">
                        {account.platform}
                      </span>
                    </div>
                    <span className={`inline-flex px-2 py-0.5 text-xs rounded-full ${
                      account.connected 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {account.connected ? 'Connected' : 'Not Connected'}
                    </span>
                  </div>
                ))}
              </div> */}
              <div className="mt-4">
                <a href="/connect" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300">
                  Manage connected accounts
                </a>
              </div>
            </div>
          </div>
          
          {/* Recent notifications */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Notifications
              </h3>
              <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                View all
              </a>
            </div>
            
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    {notification.avatar ? (
                      <img
                        src={notification.avatar}
                        alt=""
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        {getPlatformIcon(notification.type)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn btn-outline flex items-center justify-center">
                <Mail className="h-4 w-4 mr-2" />
                Compose
              </button>
              <button className="btn btn-outline flex items-center justify-center">
                <Twitter className="h-4 w-4 mr-2" />
                Tweet
              </button>
              <button className="btn btn-outline flex items-center justify-center">
                <Linkedin className="h-4 w-4 mr-2" />
                Post
              </button>
              <button className="btn btn-outline flex items-center justify-center">
                <Github className="h-4 w-4 mr-2" />
                Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;