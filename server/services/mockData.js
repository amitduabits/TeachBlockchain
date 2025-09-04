// Mock data service for development when MongoDB is not available
const mockUsers = [
  {
    _id: '1',
    username: 'demo',
    email: 'demo@example.com',
    role: 'student',
    progress: {
      completedLessons: [],
      currentModule: 'javascript-fundamentals',
      currentLesson: 1,
      totalScore: 0
    }
  }
];

const mockModules = [
  {
    _id: '1',
    title: 'JavaScript Fundamentals',
    description: 'Learn the basics of JavaScript programming',
    lessons: [
      {
        _id: '1',
        title: 'Variables and Data Types',
        description: 'Understanding JavaScript variables and data types',
        content: 'In this lesson, you will learn about JavaScript variables and data types...',
        code: '// Example code\nlet message = "Hello, World!";\nconsole.log(message);',
        tests: [
          {
            description: 'Create a variable called name',
            test: 'typeof name === "string"'
          }
        ],
        module: 'javascript-fundamentals',
        order: 1
      }
    ]
  }
];

const mockProgress = [];

class MockDataService {
  static getUsers() {
    return mockUsers;
  }

  static getUserById(id) {
    return mockUsers.find(user => user._id === id);
  }

  static getUserByEmail(email) {
    return mockUsers.find(user => user.email === email);
  }

  static createUser(userData) {
    const newUser = {
      _id: (mockUsers.length + 1).toString(),
      ...userData,
      progress: {
        completedLessons: [],
        currentModule: 'javascript-fundamentals',
        currentLesson: 1,
        totalScore: 0
      }
    };
    mockUsers.push(newUser);
    return newUser;
  }

  static getModules() {
    return mockModules;
  }

  static getModuleById(id) {
    return mockModules.find(module => module._id === id);
  }

  static getLessons() {
    return mockModules.flatMap(module => module.lessons);
  }

  static getLessonById(id) {
    const lessons = mockModules.flatMap(module => module.lessons);
    return lessons.find(lesson => lesson._id === id);
  }

  static getLessonsByModule(moduleId) {
    const module = mockModules.find(m => m._id === moduleId);
    return module ? module.lessons : [];
  }

  static getProgress(userId) {
    return mockProgress.filter(p => p.user === userId);
  }

  static updateProgress(userId, lessonId, data) {
    const existingIndex = mockProgress.findIndex(p => p.user === userId && p.lesson === lessonId);
    const progressData = {
      user: userId,
      lesson: lessonId,
      completed: data.completed || false,
      score: data.score || 0,
      codeSubmitted: data.codeSubmitted || '',
      updatedAt: new Date()
    };

    if (existingIndex >= 0) {
      mockProgress[existingIndex] = { ...mockProgress[existingIndex], ...progressData };
    } else {
      mockProgress.push(progressData);
    }

    return progressData;
  }
}

module.exports = MockDataService;

