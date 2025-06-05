import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { User, Mail, Key, Bell, Moon, Sun, Shield, Save, Check } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('account');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    }, 1000);
  };

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="card overflow-hidden">
        <div className="md:flex">
          {/* Sidebar */}
          <div className="md:w-64 bg-gray-50 dark:bg-gray-800/50 md:border-r border-gray-200 dark:border-gray-700">
            <nav className="p-4 md:p-6 space-y-1">
              <button
                onClick={() => setActiveTab('account')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === 'account'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <User className="mr-3 h-5 w-5 flex-shrink-0" />
                Account
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === 'notifications'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Bell className="mr-3 h-5 w-5 flex-shrink-0" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === 'appearance'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                {theme === 'dark' ? (
                  <Moon className="mr-3 h-5 w-5 flex-shrink-0" />
                ) : (
                  <Sun className="mr-3 h-5 w-5 flex-shrink-0" />
                )}
                Appearance
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md w-full ${activeTab === 'security'
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
              >
                <Shield className="mr-3 h-5 w-5 flex-shrink-0" />
                Security
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Account Information</h2>

                <div className="flex items-center mb-6">
                  <img
                    src={user?.avatar || 'https://i.pravatar.cc/150?img=68'}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    {user?.name && (
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h3>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        // onChange={(e) => setName(e.target.value)}
                        className="input pl-10"
                        readOnly
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        // onChange={(e) => setEmail(e.target.value)}
                        className="input pl-10"
                        readOnly
                      />
                    </div>
                  </div>

                  {/* <div className="pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn btn-primary flex items-center justify-center"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save changes
                        </>
                      )}
                    </button>
                  </div> */}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Account activity</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about sign-ins, account changes, etc.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">New messages</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Get notified when you receive new messages</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Platform updates</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about new features and updates</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Push Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Allow push notifications</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Enable browser push notifications</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn btn-primary flex items-center justify-center p-4"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save preferences
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Appearance</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Theme</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        onClick={() => theme === 'dark' && toggleTheme()}
                        className={`rounded-lg p-4 border-2 flex flex-col items-center cursor-pointer ${theme === 'light'
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700'
                          }`}
                      >
                        <div className="w-full h-24 rounded-md bg-white border border-gray-200 mb-2 flex flex-col p-2">
                          <div className="w-full h-4 rounded-sm bg-gray-100 mb-1"></div>
                          <div className="w-2/3 h-4 rounded-sm bg-gray-100"></div>
                          <div className="mt-auto flex space-x-1">
                            <div className="w-6 h-6 rounded-sm bg-blue-100"></div>
                            <div className="w-6 h-6 rounded-sm bg-gray-100"></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-2 text-gray-600" />
                          <span className={`text-sm font-medium ${theme === 'light' ? 'text-blue-700' : 'text-gray-900 dark:text-white'}`}>
                            Light
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => theme === 'light' && toggleTheme()}
                        className={`rounded-lg p-4 border-2 flex flex-col items-center cursor-pointer ${theme === 'dark'
                          ? 'border-blue-500 bg-blue-900/10'
                          : 'border-gray-200 dark:border-gray-700'
                          }`}
                      >
                        <div className="w-full h-24 rounded-md bg-gray-800 border border-gray-700 mb-2 flex flex-col p-2">
                          <div className="w-full h-4 rounded-sm bg-gray-700 mb-1"></div>
                          <div className="w-2/3 h-4 rounded-sm bg-gray-700"></div>
                          <div className="mt-auto flex space-x-1">
                            <div className="w-6 h-6 rounded-sm bg-blue-700"></div>
                            <div className="w-6 h-6 rounded-sm bg-gray-700"></div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Moon className="h-4 w-4 mr-2 text-gray-400" />
                          <span className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                            Dark
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Your theme preference will be saved automatically and applied across all your devices when you're signed in.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white">Security Settings</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Change Password</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Current Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="current_password"
                            name="current_password"
                            type="password"
                            className="input pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          New Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="new_password"
                            name="new_password"
                            type="password"
                            className="input pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Confirm New Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="confirm_password"
                            name="confirm_password"
                            type="password"
                            className="input pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable two-factor authentication</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="btn btn-primary"
                    >
                      {saving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                            <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : saved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Update security settings
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;