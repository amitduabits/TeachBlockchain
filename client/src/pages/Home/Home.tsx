import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { 
  CodeBracketIcon,
  RocketLaunchIcon,
  AcademicCapIcon,
  ChartBarIcon,
  CheckCircleIcon,
  StarIcon
} from '@heroicons/react/24/outline';

const Home: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const features = [
    {
      icon: CodeBracketIcon,
      title: 'Interactive Coding',
      description: 'Write code directly in the browser with real-time feedback and validation.',
    },
    {
      icon: RocketLaunchIcon,
      title: 'Real Projects',
      description: 'Build a complete decentralized token trading application from scratch.',
    },
    {
      icon: AcademicCapIcon,
      title: 'Step-by-Step Learning',
      description: 'Learn JavaScript, Solidity, React, Redux, and Node.js through structured modules.',
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed progress analytics and achievements.',
    },
  ];

  const modules = [
    {
      title: 'JavaScript Fundamentals',
      description: 'Master modern JavaScript with ES6+ features, async programming, and DOM manipulation.',
      lessons: 15,
      exercises: 25,
      projects: 3,
      difficulty: 'Beginner',
    },
    {
      title: 'React Development',
      description: 'Build dynamic user interfaces with React components, hooks, and state management.',
      lessons: 20,
      exercises: 30,
      projects: 4,
      difficulty: 'Intermediate',
    },
    {
      title: 'Redux State Management',
      description: 'Manage complex application state with Redux Toolkit and middleware.',
      lessons: 12,
      exercises: 18,
      projects: 2,
      difficulty: 'Intermediate',
    },
    {
      title: 'Node.js Backend',
      description: 'Create robust APIs and server-side applications with Express.js and MongoDB.',
      lessons: 18,
      exercises: 22,
      projects: 3,
      difficulty: 'Intermediate',
    },
    {
      title: 'Solidity Smart Contracts',
      description: 'Develop smart contracts for token trading, DeFi protocols, and blockchain applications.',
      lessons: 25,
      exercises: 35,
      projects: 5,
      difficulty: 'Advanced',
    },
    {
      title: 'Integration & Testing',
      description: 'Integrate all components and implement comprehensive testing strategies.',
      lessons: 10,
      exercises: 15,
      projects: 2,
      difficulty: 'Advanced',
    },
  ];

  const stats = [
    { label: 'Students', value: '10,000+' },
    { label: 'Lessons', value: '100+' },
    { label: 'Exercises', value: '145+' },
    { label: 'Projects', value: '19' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Learn Blockchain Development
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Through Real Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Master JavaScript, Solidity, React, Redux, and Node.js by building a complete 
              decentralized token trading application step by step.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                >
                  Continue Learning
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
                  >
                    Start Learning Free
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TeachBlockchain?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines theory with hands-on practice to give you the most effective learning experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow our structured curriculum designed to take you from beginner to blockchain developer.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modules.map((module, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                    Module {index + 1}
                  </span>
                  <span className="text-sm text-gray-500">
                    {module.difficulty}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {module.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {module.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <BookOpenIcon className="h-4 w-4 mr-1" />
                      {module.lessons} lessons
                    </span>
                    <span className="flex items-center">
                      <CodeBracketIcon className="h-4 w-4 mr-1" />
                      {module.exercises} exercises
                    </span>
                  </div>
                  <span className="flex items-center">
                    <RocketLaunchIcon className="h-4 w-4 mr-1" />
                    {module.projects} projects
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Blockchain Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students learning blockchain development through hands-on projects.
          </p>
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
