import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Github, Instagram, Phone, ExternalLink, BarChart2 } from 'lucide-react'; // Added BarChart2
import { useAuth } from '../hooks/useAuth';
// Assuming useNotifications hook and its Notification type might be structured like this:
// import { useNotifications, Notification as AppNotification } from '../hooks/useNotifications';

// For the purpose of this example, let's define Notification type based on usage
// Replace this with the actual import if available: import { Notification } from '../hooks/useNotifications';
interface NotificationFromHook {
  id: string;
  type: string; // e.g., 'email', 'twitter', 'linkedin'
  title: string;
  timestamp: string | number | Date; // Allow for flexible timestamp types
  avatar?: string;
}

// Mock implementation of useNotifications if not provided
// THIS MOCK WILL BE USED if the actual useNotifications hook is not providing data or is also a mock.
// Ensure this aligns with your project setup if you have a real useNotifications hook.
const useNotificationsMock = () => ({
  notifications: [
    // Emails (2)
    { id: 'n1', type: 'email', title: 'New Email: Project Alpha Update', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 'n2', type: 'email', title: 'Email: Team Meeting Reminder', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), avatar: 'https://i.pravatar.cc/150?img=5' },
    // LinkedIn (3)
    { id: 'n3', type: 'linkedin', title: 'LinkedIn: Connection Request from John Doe', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 'n4', type: 'linkedin', title: 'LinkedIn: You appeared in 5 searches this week', timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), avatar: 'https://i.pravatar.cc/150?img=6' },
    { id: 'n5', type: 'linkedin', title: 'LinkedIn: New job alert: Software Engineer', timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), avatar: 'https://i.pravatar.cc/150?img=7' },
    // Instagram (3)
    { id: 'n6', type: 'instagram', title: 'Instagram: @user123 liked your photo', timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), avatar: 'https://i.pravatar.cc/150?img=8' },
    { id: 'n7', type: 'instagram', title: 'Instagram: New follower: @insta_fan', timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), avatar: 'https://i.pravatar.cc/150?img=9' },
    { id: 'n8', type: 'instagram', title: 'Instagram: @coolpics commented: "Great shot!"', timestamp: new Date(Date.now() - 1000 * 60 * 150).toISOString(), avatar: 'https://i.pravatar.cc/150?img=10' },
    // Others for variety
    { id: 'n9', type: 'twitter', title: 'Twitter: Your tweet was retweeted', timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 'n10', type: 'github', title: 'GitHub: Issue #123 closed', timestamp: new Date(Date.now() - 1000 * 60 * 200).toISOString() },
    { id: 'n11', type: 'twitter', title: 'Twitter: New Follower @TechUpdates', timestamp: new Date(Date.now() - 1000 * 60 * 220).toISOString(), avatar: 'https://i.pravatar.cc/150?img=4' },

  ] as NotificationFromHook[],
});
// --- End of Mock ---
// Make sure to import the actual useNotifications hook from your project
// import { useNotifications } from '../hooks/useNotifications'; 
// For this example, we'll use the mock directly if the actual one isn't working as expected or for testing.
// If you have a real hook, comment out the line below and ensure your hook provides the data.
const useNotifications = useNotificationsMock;


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

interface NotificationsChartProps {
  notifications: NotificationFromHook[];
  getPlatformIcon: (platform: string) => JSX.Element | null;
}

const NotificationsChart: React.FC<NotificationsChartProps> = ({ notifications, getPlatformIcon }) => {
  const countsByType = notifications.reduce((acc, notification) => {
    acc[notification.type] = (acc[notification.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(countsByType)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending

  if (chartData.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No notification data to display in chart.
      </div>
    );
  }

  // Calculate max count for scaling bars, ensure it's at least 1 to prevent division by zero issues.
  const maxCount = Math.max(...chartData.map(d => d.count), 1);

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Notifications by Type
      </h3>
      <div className="space-y-3">
        {chartData.map(({ type, count }) => (
          <div key={type} className="flex items-center">
            <div className="w-32 flex items-center text-sm text-gray-700 dark:text-gray-300 shrink-0">
              <span className="mr-2 h-5 w-5 flex items-center justify-center">
                {getPlatformIcon(type)}
              </span>
              <span className="capitalize">{type}</span>
            </div>
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
              <div
                className="bg-blue-600 dark:bg-blue-500 h-full rounded-full text-xs flex items-center justify-end text-white transition-all duration-500 ease-out"
                style={{ width: `${(count / maxCount) * 100}%` }}
                title={`${count} notifications`}
              >
                {count > 0 && <span className="px-2">{count}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { notifications } = useNotifications() as { notifications: NotificationFromHook[] }; // Cast if needed, or ensure hook provides typed data
  const [activeTab, setActiveTab] = useState('all');

  // Mock feed data
  const feedItems: FeedItem[] = [
    // --- EMAIL (Target: 2) ---
    {
      id: 'email1',
      platform: 'email',
      content: 'Meeting agenda for tomorrow: 1. Project updates 2. Q3 planning 3. Resource allocation. Please come prepared.',
      author: 'Project Manager Alice',
      authorAvatar: 'https://i.pravatar.cc/150?img=12',
      timestamp: '12h ago',
      likes: 0,
      comments: 3,
      shares: 0
    },
    {
      id: 'email2',
      platform: 'email',
      content: 'Weekly Newsletter: Catch up on all the latest company news and achievements! Exciting updates from the R&D team.',
      author: 'Internal Comms Dept.',
      authorAvatar: 'https://i.pravatar.cc/150?img=13',
      timestamp: '1d ago',
      likes: 0,
      comments: 1,
      shares: 0
    },

    // --- LINKEDIN (Target: 3) ---
    {
      id: 'linkedin1',
      platform: 'linkedin',
      content: 'I\'m excited to share that our team has achieved a major milestone this quarter. Thanks to everyone who contributed! #TeamWork #Success',
      author: 'Jane Smith, VP Engineering',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
      timestamp: '4h ago',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 154,
      comments: 45,
      shares: 22
    },
    {
      id: 'linkedin2',
      platform: 'linkedin',
      content: 'Looking for a talented Senior UX Designer to join our growing team. DM me if interested! #Hiring #UXJobs #Design',
      author: 'Robert Brown, Talent Acquisition',
      authorAvatar: 'https://i.pravatar.cc/150?img=14',
      timestamp: '8h ago',
      likes: 78,
      comments: 10,
      shares: 5
    },
    {
      id: 'linkedin3',
      platform: 'linkedin',
      content: 'Great insights from the "Future of Tech" conference last week. Key takeaway: Ethical AI is paramount. #AI #TechConference #Ethics',
      author: 'Mark Johnson, CEO',
      authorAvatar: 'https://i.pravatar.cc/150?img=15',
      timestamp: '2d ago',
      likes: 92,
      comments: 22,
      shares: 9
    },

    // --- INSTAGRAM (Target: 3) ---
    {
      id: 'insta1',
      platform: 'instagram',
      content: 'Beautiful sunset view from our office today! Feeling grateful. #WorkLifeBalance #Sunset #OfficeViews',
      author: 'CompanyCultureHub',
      authorAvatar: 'https://i.pravatar.cc/150?img=21',
      timestamp: '1d ago',
      image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 412,
      comments: 58,
      shares: 12
    },
    {
      id: 'insta2',
      platform: 'instagram',
      content: 'Team lunch celebrating our recent product launch! So proud of this crew. 🍕🎉 #TeamBuilding #GoodVibes #LaunchParty',
      author: 'LifeAtOurCompany',
      authorAvatar: 'https://i.pravatar.cc/150?img=22',
      timestamp: '3h ago',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 180,
      comments: 25,
      shares: 6
    },
    {
      id: 'insta3',
      platform: 'instagram',
      content: 'Behind the scenes: A sneak peek into our product design process. Iteration is key! 🎨✍️ #Innovation #DesignThinking #BTS',
      author: 'DesignInnovators',
      authorAvatar: 'https://i.pravatar.cc/150?img=23',
      timestamp: '5h ago',
      image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      likes: 240,
      comments: 30,
      shares: 10
    },

    // --- OTHER PLATFORMS (Keep for variety) ---
    {
      id: 'twitter1',
      platform: 'twitter',
      content: 'Just launched our new product! Check it out at example.com. We are so excited to share this with you all! #ProductLaunch #Tech #NewRelease',
      author: 'GlobalTechCorp',
      authorAvatar: 'https://i.pravatar.cc/150?img=32',
      timestamp: '2h ago',
      likes: 65,
      comments: 18,
      shares: 11
    },
    {
      id: 'github1',
      platform: 'github',
      content: 'Pull request #42 has been merged into main: "Add new authentication features". This includes MFA support.',
      author: 'DevTeam_Alpha',
      timestamp: '6h ago',
      likes: 15,
      comments: 5,
      shares: 0
    },
  ];

  const filteredFeed = activeTab === 'all' 
    ? feedItems 
    : feedItems.filter(item => item.platform === activeTab);

  const getPlatformIcon = (platform: string) => {
    const iconClass = "h-5 w-5"; // Consistent icon size for platform icons
    
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
      case 'whatsapp': // Example, not in current data but supported
        return <Phone className={`${iconClass} text-green-500`} />;
      default: // Fallback icon for unknown platforms
        return <ExternalLink className={`${iconClass} text-gray-400`} />;
    }
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main feed or Chart */}
        <div className="md:col-span-2 space-y-6">
          <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden"> {/* Added base card styling */}
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
                {/* New Chart Tab */}
                <button
                  onClick={() => setActiveTab('chart')}
                  className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap flex items-center ${
                    activeTab === 'chart'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <BarChart2 className="h-4 w-4 mr-2" /> Chart
                </button>
              </nav>
            </div>
            
            {activeTab === 'chart' ? (
              <NotificationsChart notifications={notifications} getPlatformIcon={getPlatformIcon} />
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFeed.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No activity found for this platform.
                  </div>
                ) : (
                  filteredFeed.map((item) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
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
                              {/* Ensure icon here is also styled correctly */}
                              {React.cloneElement(getPlatformIcon(item.platform) as React.ReactElement, { className: "h-5 w-5 text-gray-500" })}
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
                          <p className="text-sm text-gray-800 dark:text-gray-200 mb-3 whitespace-pre-wrap"> {/* Added whitespace-pre-wrap */}
                            {item.content}
                          </p>
                          
                          {item.image && (
                            <div className="mb-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
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
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                              <span>{item.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                              <span>{item.comments}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-gray-700 dark:hover:text-gray-300">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                              <span>{item.shares}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User profile card */}
          <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="flex items-center">
              <img
                src={user?.avatar || 'https://i.pravatar.cc/150?img=68'}
                alt="Profile"
                className="h-14 w-14 rounded-full object-cover"
              />
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {user?.name || 'Current User'}
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
              {/* Mocked or example connected accounts display */}
              <div className="space-y-3">
                {['twitter', 'linkedin', 'github', 'instagram', 'email'].map(platform => (
                   <div key={platform} className="flex items-center justify-between">
                     <div className="flex items-center">
                       {/* Clone element to potentially adjust size/color if needed */}
                       {React.cloneElement(getPlatformIcon(platform) as React.ReactElement, { className: "h-5 w-5" })}
                       <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm capitalize">
                         {platform}
                       </span>
                     </div>
                     <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                       Connected
                     </span>
                   </div>
                ))}
              </div>
              <div className="mt-4">
                <a href="#" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-800 dark:hover:text-blue-300">
                  Manage connected accounts
                </a>
              </div>
            </div>
          </div>
          
          {/* Recent notifications */}
          <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
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
                        {getPlatformIcon(notification.type) && React.cloneElement(getPlatformIcon(notification.type) as React.ReactElement, { className: "h-4 w-4" })}
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
               {notifications.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent notifications.</p>
              )}
            </div>
          </div>
          
          {/* Quick actions */}
          <div className="card bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {/* Example button styling (assuming btn and btn-outline are defined elsewhere) */}
              <button className="btn btn-outline flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                Compose
              </button>
              <button className="btn btn-outline flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <Twitter className="h-4 w-4 mr-2" />
                Tweet
              </button>
              <button className="btn btn-outline flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
                <Linkedin className="h-4 w-4 mr-2" />
                Post
              </button>
              <button className="btn btn-outline flex items-center justify-center p-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-700 dark:text-gray-300">
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