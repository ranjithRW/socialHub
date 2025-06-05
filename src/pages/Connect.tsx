import React, { useState } from 'react';
import { Mail, Twitter, Linkedin, Github, Instagram, Phone, AlertCircle, Check, RefreshCw } from 'lucide-react';

const Connect: React.FC = () => {
  const [platforms, setPlatforms] = useState([
    { id: 'email', name: 'Email', icon: Mail, connected: true, username: 'john@example.com', color: 'blue' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, connected: true, username: '@johndoe', color: 'blue' },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, connected: true, username: 'John Doe', color: 'blue' },
    { id: 'github', name: 'GitHub', icon: Github, connected: true, username: 'johndoe', color: 'gray' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, connected: false, username: '', color: 'pink' },
    { id: 'whatsapp', name: 'WhatsApp', icon: Phone, connected: false, username: '', color: 'green' },
  ]);

  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (id: string) => {
    setConnecting(id);

    // Simulate API call
    setTimeout(() => {
      setPlatforms(platforms.map(platform => 
        platform.id === id 
          ? { ...platform, connected: true, username: platform.username || `johndoe_${id}` } 
          : platform
      ));
      setConnecting(null);
    }, 1500);
  };

  const handleDisconnect = (id: string) => {
    setConnecting(id);

    // Simulate API call
    setTimeout(() => {
      setPlatforms(platforms.map(platform => 
        platform.id === id 
          ? { ...platform, connected: false, username: '' } 
          : platform
      ));
      setConnecting(null);
    }, 1500);
  };

  const getColorClass = (color: string, connected: boolean) => {
    if (!connected) return 'text-gray-400 dark:text-gray-500';
    
    switch (color) {
      case 'blue':
        return 'text-blue-500 dark:text-blue-400';
      case 'pink':
        return 'text-pink-500 dark:text-pink-400';
      case 'green':
        return 'text-green-500 dark:text-green-400';
      case 'gray':
        return 'text-gray-800 dark:text-gray-200';
      default:
        return 'text-blue-500 dark:text-blue-400';
    }
  };

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Connect Your Accounts</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Connect your social media accounts to manage everything in one place
        </p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Attention</h3>
            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
              <p>
                For this demo, connections are simulated. In a real application, you would be redirected to the respective platform for authentication.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {platforms.map((platform) => (
          <div 
            key={platform.id} 
            className="card p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <platform.icon className={`h-8 w-8 mr-3 ${getColorClass(platform.color, platform.connected)}`} />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {platform.name}
              </h2>
            </div>
            
            <div className="mb-6">
              {platform.connected ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">Connected as</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {platform.username}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full mr-2"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Not connected</span>
                </div>
              )}
            </div>

            {platform.connected ? (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sync notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Sync posts</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => handleDisconnect(platform.id)}
                  disabled={connecting === platform.id}
                  className="btn btn-outline w-full text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
                >
                  {connecting === platform.id ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    'Disconnect'
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => handleConnect(platform.id)}
                disabled={connecting === platform.id}
                className="btn btn-primary w-full"
              >
                {connecting === platform.id ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Connect
                  </>
                )}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connect;