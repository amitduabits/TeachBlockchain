const modules = [
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Fundamentals',
    description: 'Master modern JavaScript with ES6+ features, async programming, and DOM manipulation. Build the foundation for your blockchain development journey.',
    prerequisites: [],
    objectives: [
      'Understand JavaScript syntax and data types',
      'Master ES6+ features like arrow functions, destructuring, and modules',
      'Learn async programming with Promises and async/await',
      'Handle DOM manipulation and events',
      'Work with APIs and JSON data'
    ],
    estimatedTime: 1200, // 20 hours
    difficulty: 'beginner',
    order: 1,
    isActive: true,
    thumbnail: '/images/modules/javascript-fundamentals.jpg',
    tags: ['javascript', 'es6', 'dom', 'async', 'fundamentals'],
    lessons: [
      {
        id: 'js-01-variables-functions',
        title: 'Variables and Functions',
        description: 'Learn about JavaScript variables, function declarations, and expressions.',
        order: 1,
      },
      {
        id: 'js-02-arrays-objects',
        title: 'Arrays and Objects',
        description: 'Master working with arrays and objects in JavaScript.',
        order: 2,
      },
      {
        id: 'js-03-arrow-functions',
        title: 'Arrow Functions and ES6',
        description: 'Explore modern JavaScript features including arrow functions.',
        order: 3,
      },
      {
        id: 'js-04-destructuring',
        title: 'Destructuring and Spread',
        description: 'Learn destructuring assignment and spread operator.',
        order: 4,
      },
      {
        id: 'js-05-async-promises',
        title: 'Async Programming with Promises',
        description: 'Understand asynchronous programming and Promises.',
        order: 5,
      },
      {
        id: 'js-06-async-await',
        title: 'Async/Await',
        description: 'Master the async/await syntax for cleaner async code.',
        order: 6,
      },
      {
        id: 'js-07-dom-manipulation',
        title: 'DOM Manipulation',
        description: 'Learn to interact with the Document Object Model.',
        order: 7,
      },
      {
        id: 'js-08-events',
        title: 'Event Handling',
        description: 'Handle user interactions with event listeners.',
        order: 8,
      },
      {
        id: 'js-09-fetch-api',
        title: 'Fetch API and HTTP Requests',
        description: 'Make HTTP requests and work with APIs.',
        order: 9,
      },
      {
        id: 'js-10-modules',
        title: 'ES6 Modules',
        description: 'Organize code with ES6 module system.',
        order: 10,
      },
      {
        id: 'js-11-error-handling',
        title: 'Error Handling',
        description: 'Implement proper error handling in JavaScript.',
        order: 11,
      },
      {
        id: 'js-12-json',
        title: 'Working with JSON',
        description: 'Parse and stringify JSON data.',
        order: 12,
      },
      {
        id: 'js-13-local-storage',
        title: 'Local Storage and Session Storage',
        description: 'Store data in the browser.',
        order: 13,
      },
      {
        id: 'js-14-timer-functions',
        title: 'Timer Functions',
        description: 'Use setTimeout, setInterval, and requestAnimationFrame.',
        order: 14,
      },
      {
        id: 'js-15-project-todo-app',
        title: 'Project: Todo Application',
        description: 'Build a complete todo application using vanilla JavaScript.',
        order: 15,
      }
    ],
    projects: [
      {
        id: 'js-project-01-calculator',
        title: 'JavaScript Calculator',
        description: 'Build a fully functional calculator with a clean interface.',
        requirements: [
          'Create a calculator with basic arithmetic operations',
          'Handle keyboard input',
          'Implement clear and delete functions',
          'Add error handling for invalid operations',
          'Make it responsive and accessible'
        ],
        estimatedTime: 180,
        difficulty: 'beginner',
        order: 1,
      },
      {
        id: 'js-project-02-weather-app',
        title: 'Weather Application',
        description: 'Create a weather app that fetches data from an API.',
        requirements: [
          'Fetch weather data from a public API',
          'Display current weather and forecast',
          'Handle different locations',
          'Add loading states and error handling',
          'Implement search functionality'
        ],
        estimatedTime: 240,
        difficulty: 'intermediate',
        order: 2,
      },
      {
        id: 'js-project-03-trading-simulator',
        title: 'Trading Simulator (Foundation)',
        description: 'Build the foundation for a trading simulator with mock data.',
        requirements: [
          'Create a mock trading interface',
          'Display price charts using mock data',
          'Implement buy/sell functionality',
          'Track portfolio value',
          'Add transaction history'
        ],
        estimatedTime: 300,
        difficulty: 'intermediate',
        order: 3,
      }
    ]
  },
  {
    id: 'react-development',
    title: 'React Development',
    description: 'Build dynamic user interfaces with React components, hooks, and state management. Create the frontend for your trading application.',
    prerequisites: ['javascript-fundamentals'],
    objectives: [
      'Understand React components and JSX',
      'Master React hooks (useState, useEffect, useContext)',
      'Handle component lifecycle and side effects',
      'Implement routing with React Router',
      'Build forms and handle user input',
      'Optimize performance with memoization'
    ],
    estimatedTime: 1500, // 25 hours
    difficulty: 'intermediate',
    order: 2,
    isActive: true,
    thumbnail: '/images/modules/react-development.jpg',
    tags: ['react', 'jsx', 'hooks', 'components', 'routing'],
    lessons: [
      {
        id: 'react-01-introduction',
        title: 'Introduction to React',
        description: 'Learn the basics of React and JSX.',
        order: 1,
      },
      {
        id: 'react-02-components',
        title: 'Components and Props',
        description: 'Create and use React components.',
        order: 2,
      },
      {
        id: 'react-03-state',
        title: 'State and useState Hook',
        description: 'Manage component state with useState.',
        order: 3,
      },
      {
        id: 'react-04-effects',
        title: 'useEffect Hook',
        description: 'Handle side effects in React components.',
        order: 4,
      },
      {
        id: 'react-05-conditional-rendering',
        title: 'Conditional Rendering',
        description: 'Render components conditionally.',
        order: 5,
      },
      {
        id: 'react-06-lists-keys',
        title: 'Lists and Keys',
        description: 'Render lists of components efficiently.',
        order: 6,
      },
      {
        id: 'react-07-forms',
        title: 'Forms and Controlled Components',
        description: 'Handle form input and validation.',
        order: 7,
      },
      {
        id: 'react-08-lifting-state',
        title: 'Lifting State Up',
        description: 'Share state between components.',
        order: 8,
      },
      {
        id: 'react-09-composition',
        title: 'Composition vs Inheritance',
        description: 'Build reusable components through composition.',
        order: 9,
      },
      {
        id: 'react-10-context',
        title: 'Context API',
        description: 'Share data across component trees.',
        order: 10,
      },
      {
        id: 'react-11-refs',
        title: 'Refs and useRef',
        description: 'Access DOM elements and store mutable values.',
        order: 11,
      },
      {
        id: 'react-12-memo',
        title: 'Performance Optimization',
        description: 'Optimize React performance with memoization.',
        order: 12,
      },
      {
        id: 'react-13-custom-hooks',
        title: 'Custom Hooks',
        description: 'Create reusable custom hooks.',
        order: 13,
      },
      {
        id: 'react-14-routing',
        title: 'React Router',
        description: 'Implement client-side routing.',
        order: 14,
      },
      {
        id: 'react-15-testing',
        title: 'Testing React Components',
        description: 'Write tests for React components.',
        order: 15,
      },
      {
        id: 'react-16-project-trading-ui',
        title: 'Project: Trading UI Components',
        description: 'Build reusable trading interface components.',
        order: 16,
      }
    ],
    projects: [
      {
        id: 'react-project-01-portfolio',
        title: 'Portfolio Tracker',
        description: 'Create a portfolio tracking application with React.',
        requirements: [
          'Display portfolio holdings and values',
          'Add/remove assets from portfolio',
          'Calculate total portfolio value',
          'Show performance charts',
          'Implement responsive design'
        ],
        estimatedTime: 300,
        difficulty: 'intermediate',
        order: 1,
      },
      {
        id: 'react-project-02-order-book',
        title: 'Order Book Interface',
        description: 'Build a real-time order book display component.',
        requirements: [
          'Display buy and sell orders',
          'Update in real-time with mock data',
          'Implement order filtering and sorting',
          'Add order placement functionality',
          'Create responsive layout'
        ],
        estimatedTime: 360,
        difficulty: 'intermediate',
        order: 2,
      },
      {
        id: 'react-project-03-trading-dashboard',
        title: 'Trading Dashboard',
        description: 'Create a comprehensive trading dashboard.',
        requirements: [
          'Multiple chart types (line, candlestick)',
          'Real-time price updates',
          'Order management interface',
          'Portfolio overview',
          'News and market data feeds'
        ],
        estimatedTime: 480,
        difficulty: 'advanced',
        order: 3,
      }
    ]
  },
  {
    id: 'redux-state-management',
    title: 'Redux State Management',
    description: 'Manage complex application state with Redux Toolkit and middleware. Handle global state for your trading application.',
    prerequisites: ['react-development'],
    objectives: [
      'Understand Redux principles and architecture',
      'Master Redux Toolkit for simplified state management',
      'Implement async actions with Redux Thunk',
      'Handle complex state updates with reducers',
      'Connect React components to Redux store',
      'Implement middleware for side effects'
    ],
    estimatedTime: 900, // 15 hours
    difficulty: 'intermediate',
    order: 3,
    isActive: true,
    thumbnail: '/images/modules/redux-state-management.jpg',
    tags: ['redux', 'state-management', 'middleware', 'toolkit'],
    lessons: [
      {
        id: 'redux-01-introduction',
        title: 'Introduction to Redux',
        description: 'Learn Redux principles and architecture.',
        order: 1,
      },
      {
        id: 'redux-02-store',
        title: 'Store, Actions, and Reducers',
        description: 'Understand the core Redux concepts.',
        order: 2,
      },
      {
        id: 'redux-03-connect',
        title: 'Connecting React to Redux',
        description: 'Use connect() to connect components to store.',
        order: 3,
      },
      {
        id: 'redux-04-hooks',
        title: 'Redux Hooks',
        description: 'Use useSelector and useDispatch hooks.',
        order: 4,
      },
      {
        id: 'redux-05-toolkit',
        title: 'Redux Toolkit',
        description: 'Simplify Redux with Redux Toolkit.',
        order: 5,
      },
      {
        id: 'redux-06-async-actions',
        title: 'Async Actions with Thunk',
        description: 'Handle asynchronous operations with Redux Thunk.',
        order: 6,
      },
      {
        id: 'redux-07-middleware',
        title: 'Middleware',
        description: 'Implement custom middleware for side effects.',
        order: 7,
      },
      {
        id: 'redux-08-normalization',
        title: 'State Normalization',
        description: 'Structure state for better performance.',
        order: 8,
      },
      {
        id: 'redux-09-selectors',
        title: 'Selectors and Memoization',
        description: 'Create efficient selectors with reselect.',
        order: 9,
      },
      {
        id: 'redux-10-devtools',
        title: 'Redux DevTools',
        description: 'Debug Redux applications with DevTools.',
        order: 10,
      },
      {
        id: 'redux-11-testing',
        title: 'Testing Redux',
        description: 'Write tests for Redux logic.',
        order: 11,
      },
      {
        id: 'redux-12-project-trading-state',
        title: 'Project: Trading State Management',
        description: 'Implement Redux for trading application state.',
        order: 12,
      }
    ],
    projects: [
      {
        id: 'redux-project-01-trading-store',
        title: 'Trading Store Setup',
        description: 'Set up Redux store for trading application.',
        requirements: [
          'Create store with Redux Toolkit',
          'Implement user state slice',
          'Create portfolio state slice',
          'Add order state management',
          'Set up middleware for API calls'
        ],
        estimatedTime: 240,
        difficulty: 'intermediate',
        order: 1,
      },
      {
        id: 'redux-project-02-real-time-updates',
        title: 'Real-time State Updates',
        description: 'Handle real-time data updates with Redux.',
        requirements: [
          'Implement WebSocket connection',
          'Update prices in real-time',
          'Handle order book updates',
          'Manage connection state',
          'Add error handling and reconnection'
        ],
        estimatedTime: 300,
        difficulty: 'advanced',
        order: 2,
      }
    ]
  },
  {
    id: 'nodejs-backend',
    title: 'Node.js Backend',
    description: 'Create robust APIs and server-side applications with Express.js and MongoDB. Build the backend for your trading platform.',
    prerequisites: ['javascript-fundamentals'],
    objectives: [
      'Set up Node.js development environment',
      'Build RESTful APIs with Express.js',
      'Implement authentication and authorization',
      'Work with MongoDB and Mongoose',
      'Handle file uploads and validation',
      'Implement real-time features with WebSockets'
    ],
    estimatedTime: 1200, // 20 hours
    difficulty: 'intermediate',
    order: 4,
    isActive: true,
    thumbnail: '/images/modules/nodejs-backend.jpg',
    tags: ['nodejs', 'express', 'mongodb', 'api', 'authentication'],
    lessons: [
      {
        id: 'node-01-introduction',
        title: 'Introduction to Node.js',
        description: 'Learn Node.js fundamentals and setup.',
        order: 1,
      },
      {
        id: 'node-02-modules',
        title: 'Modules and NPM',
        description: 'Work with Node.js modules and package management.',
        order: 2,
      },
      {
        id: 'node-03-express',
        title: 'Express.js Framework',
        description: 'Build web applications with Express.',
        order: 3,
      },
      {
        id: 'node-04-routing',
        title: 'Routing and Middleware',
        description: 'Implement routing and custom middleware.',
        order: 4,
      },
      {
        id: 'node-05-request-response',
        title: 'Request and Response Handling',
        description: 'Handle HTTP requests and responses.',
        order: 5,
      },
      {
        id: 'node-06-mongodb',
        title: 'MongoDB and Mongoose',
        description: 'Work with MongoDB using Mongoose ODM.',
        order: 6,
      },
      {
        id: 'node-07-authentication',
        title: 'Authentication and JWT',
        description: 'Implement user authentication with JWT.',
        order: 7,
      },
      {
        id: 'node-08-validation',
        title: 'Input Validation and Sanitization',
        description: 'Validate and sanitize user input.',
        order: 8,
      },
      {
        id: 'node-09-error-handling',
        title: 'Error Handling',
        description: 'Implement proper error handling.',
        order: 9,
      },
      {
        id: 'node-10-file-upload',
        title: 'File Upload and Storage',
        description: 'Handle file uploads and storage.',
        order: 10,
      },
      {
        id: 'node-11-security',
        title: 'Security Best Practices',
        description: 'Implement security measures.',
        order: 11,
      },
      {
        id: 'node-12-testing',
        title: 'Testing Node.js Applications',
        description: 'Write tests for Node.js applications.',
        order: 12,
      },
      {
        id: 'node-13-websockets',
        title: 'WebSockets and Real-time',
        description: 'Implement real-time features with WebSockets.',
        order: 13,
      },
      {
        id: 'node-14-deployment',
        title: 'Deployment and Production',
        description: 'Deploy Node.js applications to production.',
        order: 14,
      },
      {
        id: 'node-15-project-trading-api',
        title: 'Project: Trading API',
        description: 'Build a complete trading API backend.',
        order: 15,
      }
    ],
    projects: [
      {
        id: 'node-project-01-user-api',
        title: 'User Management API',
        description: 'Create user registration and authentication API.',
        requirements: [
          'User registration and login endpoints',
          'JWT-based authentication',
          'Password hashing and validation',
          'User profile management',
          'Password reset functionality'
        ],
        estimatedTime: 300,
        difficulty: 'intermediate',
        order: 1,
      },
      {
        id: 'node-project-02-trading-api',
        title: 'Trading API Backend',
        description: 'Build comprehensive trading API endpoints.',
        requirements: [
          'Portfolio management endpoints',
          'Order placement and management',
          'Price data endpoints',
          'Transaction history',
          'Real-time WebSocket updates'
        ],
        estimatedTime: 480,
        difficulty: 'advanced',
        order: 2,
      },
      {
        id: 'node-project-03-admin-panel',
        title: 'Admin Panel API',
        description: 'Create admin endpoints for platform management.',
        requirements: [
          'User management for admins',
          'Trading statistics and analytics',
          'System monitoring endpoints',
          'Audit logging',
          'Configuration management'
        ],
        estimatedTime: 360,
        difficulty: 'advanced',
        order: 3,
      }
    ]
  },
  {
    id: 'solidity-smart-contracts',
    title: 'Solidity Smart Contracts',
    description: 'Develop smart contracts for token trading, DeFi protocols, and blockchain applications. Create the blockchain foundation.',
    prerequisites: ['javascript-fundamentals'],
    objectives: [
      'Understand blockchain and Ethereum fundamentals',
      'Master Solidity syntax and features',
      'Implement ERC-20 and ERC-721 token standards',
      'Build DeFi protocols and trading contracts',
      'Handle security considerations and best practices',
      'Deploy and interact with smart contracts'
    ],
    estimatedTime: 1800, // 30 hours
    difficulty: 'advanced',
    order: 5,
    isActive: true,
    thumbnail: '/images/modules/solidity-smart-contracts.jpg',
    tags: ['solidity', 'ethereum', 'smart-contracts', 'defi', 'blockchain'],
    lessons: [
      {
        id: 'solidity-01-introduction',
        title: 'Introduction to Blockchain and Ethereum',
        description: 'Learn blockchain fundamentals and Ethereum basics.',
        order: 1,
      },
      {
        id: 'solidity-02-development-environment',
        title: 'Development Environment Setup',
        description: 'Set up Solidity development environment.',
        order: 2,
      },
      {
        id: 'solidity-03-basics',
        title: 'Solidity Basics',
        description: 'Learn Solidity syntax and data types.',
        order: 3,
      },
      {
        id: 'solidity-04-functions',
        title: 'Functions and Modifiers',
        description: 'Master function declarations and modifiers.',
        order: 4,
      },
      {
        id: 'solidity-05-inheritance',
        title: 'Inheritance and Interfaces',
        description: 'Implement inheritance and interfaces.',
        order: 5,
      },
      {
        id: 'solidity-06-events',
        title: 'Events and Logging',
        description: 'Use events for logging and communication.',
        order: 6,
      },
      {
        id: 'solidity-07-erc20',
        title: 'ERC-20 Token Standard',
        description: 'Implement ERC-20 token contracts.',
        order: 7,
      },
      {
        id: 'solidity-08-erc721',
        title: 'ERC-721 NFT Standard',
        description: 'Create NFT contracts with ERC-721.',
        order: 8,
      },
      {
        id: 'solidity-09-dex',
        title: 'Decentralized Exchange (DEX)',
        description: 'Build a simple DEX contract.',
        order: 9,
      },
      {
        id: 'solidity-10-amm',
        title: 'Automated Market Maker (AMM)',
        description: 'Implement AMM functionality.',
        order: 10,
      },
      {
        id: 'solidity-11-liquidity-pools',
        title: 'Liquidity Pools',
        description: 'Create liquidity pool contracts.',
        order: 11,
      },
      {
        id: 'solidity-12-yield-farming',
        title: 'Yield Farming and Staking',
        description: 'Implement yield farming mechanisms.',
        order: 12,
      },
      {
        id: 'solidity-13-oracles',
        title: 'Price Oracles',
        description: 'Integrate price oracles for external data.',
        order: 13,
      },
      {
        id: 'solidity-14-security',
        title: 'Security Best Practices',
        description: 'Learn smart contract security patterns.',
        order: 14,
      },
      {
        id: 'solidity-15-testing',
        title: 'Testing Smart Contracts',
        description: 'Write comprehensive tests for contracts.',
        order: 15,
      },
      {
        id: 'solidity-16-deployment',
        title: 'Deployment and Interaction',
        description: 'Deploy contracts and interact with them.',
        order: 16,
      },
      {
        id: 'solidity-17-upgradeable',
        title: 'Upgradeable Contracts',
        description: 'Implement upgradeable contract patterns.',
        order: 17,
      },
      {
        id: 'solidity-18-gas-optimization',
        title: 'Gas Optimization',
        description: 'Optimize contracts for gas efficiency.',
        order: 18,
      },
      {
        id: 'solidity-19-project-trading-contract',
        title: 'Project: Trading Contract',
        description: 'Build a complete trading smart contract.',
        order: 19,
      }
    ],
    projects: [
      {
        id: 'solidity-project-01-token',
        title: 'Custom Token Contract',
        description: 'Create a custom ERC-20 token with additional features.',
        requirements: [
          'Implement ERC-20 standard',
          'Add minting and burning functionality',
          'Include transfer restrictions',
          'Add governance features',
          'Implement tax mechanisms'
        ],
        estimatedTime: 360,
        difficulty: 'intermediate',
        order: 1,
      },
      {
        id: 'solidity-project-02-dex',
        title: 'Decentralized Exchange',
        description: 'Build a complete DEX with trading functionality.',
        requirements: [
          'Token swap functionality',
          'Liquidity provision',
          'Price calculation',
          'Fee collection',
          'Admin controls'
        ],
        estimatedTime: 600,
        difficulty: 'advanced',
        order: 2,
      },
      {
        id: 'solidity-project-03-yield-farm',
        title: 'Yield Farming Protocol',
        description: 'Create a yield farming and staking protocol.',
        requirements: [
          'Staking mechanisms',
          'Reward distribution',
          'Multiple pool support',
          'Time-locked staking',
          'Governance integration'
        ],
        estimatedTime: 720,
        difficulty: 'advanced',
        order: 3,
      },
      {
        id: 'solidity-project-04-nft-marketplace',
        title: 'NFT Marketplace',
        description: 'Build an NFT marketplace with trading features.',
        requirements: [
          'NFT minting and trading',
          'Auction functionality',
          'Royalty distribution',
          'Collection management',
          'Search and filtering'
        ],
        estimatedTime: 480,
        difficulty: 'advanced',
        order: 4,
      },
      {
        id: 'solidity-project-05-lending-protocol',
        title: 'Lending Protocol',
        description: 'Implement a DeFi lending and borrowing protocol.',
        requirements: [
          'Collateral-based lending',
          'Interest rate calculation',
          'Liquidation mechanisms',
          'Multiple asset support',
          'Risk management'
        ],
        estimatedTime: 600,
        difficulty: 'advanced',
        order: 5,
      }
    ]
  },
  {
    id: 'integration-testing',
    title: 'Integration & Testing',
    description: 'Integrate all components and implement comprehensive testing strategies. Deploy and maintain your trading application.',
    prerequisites: ['react-development', 'redux-state-management', 'nodejs-backend', 'solidity-smart-contracts'],
    objectives: [
      'Integrate frontend, backend, and smart contracts',
      'Implement comprehensive testing strategies',
      'Set up CI/CD pipelines',
      'Deploy applications to production',
      'Monitor and maintain applications',
      'Implement security measures and audits'
    ],
    estimatedTime: 900, // 15 hours
    difficulty: 'advanced',
    order: 6,
    isActive: true,
    thumbnail: '/images/modules/integration-testing.jpg',
    tags: ['integration', 'testing', 'deployment', 'ci-cd', 'monitoring'],
    lessons: [
      {
        id: 'integration-01-web3-integration',
        title: 'Web3 Integration',
        description: 'Connect frontend to blockchain networks.',
        order: 1,
      },
      {
        id: 'integration-02-wallet-connection',
        title: 'Wallet Connection',
        description: 'Implement wallet connection functionality.',
        order: 2,
      },
      {
        id: 'integration-03-contract-interaction',
        title: 'Smart Contract Interaction',
        description: 'Interact with smart contracts from frontend.',
        order: 3,
      },
      {
        id: 'integration-04-transaction-handling',
        title: 'Transaction Handling',
        description: 'Handle blockchain transactions and confirmations.',
        order: 4,
      },
      {
        id: 'integration-05-error-handling',
        title: 'Error Handling and Recovery',
        description: 'Implement robust error handling.',
        order: 5,
      },
      {
        id: 'integration-06-testing-strategy',
        title: 'Testing Strategy',
        description: 'Plan comprehensive testing approach.',
        order: 6,
      },
      {
        id: 'integration-07-unit-testing',
        title: 'Unit Testing',
        description: 'Write unit tests for all components.',
        order: 7,
      },
      {
        id: 'integration-08-integration-testing',
        title: 'Integration Testing',
        description: 'Test component integration.',
        order: 8,
      },
      {
        id: 'integration-09-e2e-testing',
        title: 'End-to-End Testing',
        description: 'Implement E2E testing with Cypress.',
        order: 9,
      },
      {
        id: 'integration-10-project-complete-app',
        title: 'Project: Complete Trading Application',
        description: 'Integrate all components into a complete application.',
        order: 10,
      }
    ],
    projects: [
      {
        id: 'integration-project-01-full-stack',
        title: 'Full-Stack Integration',
        description: 'Integrate frontend, backend, and smart contracts.',
        requirements: [
          'Connect React frontend to Node.js backend',
          'Integrate Web3 wallet connection',
          'Implement real-time data updates',
          'Handle transaction flow end-to-end',
          'Add comprehensive error handling'
        ],
        estimatedTime: 600,
        difficulty: 'advanced',
        order: 1,
      },
      {
        id: 'integration-project-02-deployment',
        title: 'Production Deployment',
        description: 'Deploy the complete application to production.',
        requirements: [
          'Set up CI/CD pipeline',
          'Deploy smart contracts to testnet/mainnet',
          'Deploy backend to cloud platform',
          'Deploy frontend to CDN',
          'Configure monitoring and logging'
        ],
        estimatedTime: 480,
        difficulty: 'advanced',
        order: 2,
      }
    ]
  }
];

module.exports = modules;
