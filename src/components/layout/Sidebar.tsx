import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Users,
  LogOut,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar: React.FC = () => {
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogout = () => logout();

  const NavItem = ({
    icon,
    label,
    to,
  }: {
    icon: React.ReactNode;
    label: string;
    to: string;
  }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center py-3 px-4 rounded-lg transition-colors ${isActive
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
    <>
      {/* Mobile Backdrop */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 z-40 h-full
        bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out flex flex-col
        ${isCollapsed ? '-translate-x-full md:translate-x-0 md:w-24' : 'translate-x-0 md:w-64'}
        w-64`}
      >
        {/* Logo and Collapse Button */}
        <div className="p-4 flex items-center justify-between relative">
          {!isCollapsed && (
            <div className="flex items-center">
              <Layers className="h-8 w-8 text-blue-600 dark:text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Obito</span>
            </div>
          )}
          {isCollapsed && (
            <div className="mx-auto md:mx-0">
              <Layers className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            </div>
          )}
          {/* Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`
    text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300
    absolute top-4 right-4 md:static z-50 p-2 rounded-md
    ${isCollapsed ? 'hidden md:block' : ''}
  `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isCollapsed ? (
                // Icon for >>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              ) : (
                // Icon for <<
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              )}
            </svg>
          </button>

        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" to="/dashboard" />
          <NavItem icon={<Users size={20} />} label="Connect Accounts" to="/connect" />
          <NavItem icon={<Settings size={20} />} label="Settings" to="/settings" />
        </nav>

        {/* User Info + Logout */}
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
            className={`flex items-center w-full py-2 px-4 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors 
            ${isCollapsed ? 'justify-center' : ''
              }`}
          >
            {isCollapsed && (
              <div className="mx-auto md:mx-0">
                <LogOut size={20} className="text-gray-500" />
              </div>
            )}
            {!isCollapsed && (
              <LogOut size={20} className="text-gray-500" />
            )}
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Hamburger Button (mobile only) */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="md:hidden fixed top-4 left-4 bg-white z-50 dark:bg-gray-800 p-2 rounded-md shadow-md text-gray-700 dark:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

    </>
  );
};

export default Sidebar;
