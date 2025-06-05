import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Users, 
  LogOut, 
  Layers, 
  MessageCircle,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Phone
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const NavItem = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 px-4 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </NavLink>
  );

  return (
    <aside
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      } hidden md:flex flex-col h-full`}
    >
      {/* Logo and Collapse Button */}
      <div className="p-4 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center">
            <Layers className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Obito</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto">
            <Layers className="h-8 w-8 text-blue-600 dark:text-blue-500" />
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 ${isCollapsed ? 'hidden' : ''}`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/dashboard" />
        <NavItem icon={<Users size={20} />} label="Connect Accounts" to="/connect" />
        <NavItem icon={<Settings size={20} />} label="Settings" to="/settings" />
      </nav>

     

      {/* User Profile and Logout */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <div className="flex items-center mb-4">
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150?img=68'}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`flex items-center w-full py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            isCollapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={20} className="text-gray-500" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;