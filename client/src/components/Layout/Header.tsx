import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { logoutUser } from '../../store/slices/authSlice';
import { toggleSidebar, setTheme } from '../../store/slices/uiSlice';
import { 
  Bars3Icon, 
  SunIcon, 
  MoonIcon, 
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { theme, sidebarOpen } = useSelector((state: RootState) => state.ui);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <button
                onClick={() => dispatch(toggleSidebar())}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Bars3Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TB</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                TeachBlockchain
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === 'light' ? (
                <MoonIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <SunIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {/* User info */}
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Level {user?.level} • {user?.experience} XP
                    </p>
                  </div>
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                </div>

                {/* Settings */}
                <Link
                  to="/profile"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <Cog6ToothIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
