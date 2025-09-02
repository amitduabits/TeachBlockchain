import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  HomeIcon,
  BookOpenIcon,
  CodeBracketIcon,
  RocketLaunchIcon,
  ChartBarIcon,
  UserIcon,
  AcademicCapIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { userProgress } = useSelector((state: RootState) => state.progress);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HomeIcon,
      current: location.pathname === '/dashboard',
    },
    {
      name: 'Modules',
      href: '/modules',
      icon: BookOpenIcon,
      current: location.pathname.startsWith('/modules'),
    },
    {
      name: 'Progress',
      href: '/progress',
      icon: ChartBarIcon,
      current: location.pathname === '/progress',
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: UserIcon,
      current: location.pathname === '/profile',
    },
  ];

  const modules = [
    {
      id: 'javascript-fundamentals',
      title: 'JavaScript Fundamentals',
      progress: 75,
      lessons: 15,
      completed: 11,
    },
    {
      id: 'react-development',
      title: 'React Development',
      progress: 45,
      lessons: 20,
      completed: 9,
    },
    {
      id: 'redux-state-management',
      title: 'Redux State Management',
      progress: 20,
      lessons: 12,
      completed: 2,
    },
    {
      id: 'nodejs-backend',
      title: 'Node.js Backend',
      progress: 0,
      lessons: 18,
      completed: 0,
    },
    {
      id: 'solidity-smart-contracts',
      title: 'Solidity Smart Contracts',
      progress: 0,
      lessons: 25,
      completed: 0,
    },
    {
      id: 'integration-testing',
      title: 'Integration & Testing',
      progress: 0,
      lessons: 10,
      completed: 0,
    },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                item.current
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Modules Progress */}
        <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Course Progress
          </h3>
          <div className="space-y-3">
            {modules.map((module) => (
              <div key={module.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {module.title}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {module.completed}/{module.lessons}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Stats */}
        {userProgress && (
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <TrophyIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  Level {userProgress.currentLevel}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <AcademicCapIcon className="h-4 w-4 text-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">
                  {userProgress.completedLessons} lessons
                </span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {userProgress.experience} XP • {userProgress.streak} day streak
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
