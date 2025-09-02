// MongoDB initialization script
db = db.getSiblingDB('teachblockchain');

// Create collections
db.createCollection('users');
db.createCollection('modules');
db.createCollection('lessons');
db.createCollection('progress');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: 1 });
db.users.createIndex({ level: 1, experience: -1 });

db.modules.createIndex({ id: 1 }, { unique: true });
db.modules.createIndex({ order: 1 });
db.modules.createIndex({ isActive: 1 });

db.lessons.createIndex({ id: 1 });
db.lessons.createIndex({ moduleId: 1 });
db.lessons.createIndex({ order: 1 });

db.progress.createIndex({ userId: 1, moduleId: 1 });
db.progress.createIndex({ userId: 1, type: 1 });
db.progress.createIndex({ userId: 1, completed: 1 });
db.progress.createIndex({ createdAt: 1 });

// Insert initial data
print('MongoDB initialization completed');
