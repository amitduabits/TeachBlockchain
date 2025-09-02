const mongoose = require('mongoose');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const modules = require('../data/modules');
const jsLessons = require('../data/lessons/javascript-fundamentals');
const solidityLessons = require('../data/lessons/solidity-smart-contracts');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/teachblockchain');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const seedModules = async () => {
  try {
    // Clear existing modules
    await Module.deleteMany({});
    console.log('Cleared existing modules');

    // Insert new modules
    for (const moduleData of modules) {
      const module = new Module(moduleData);
      await module.save();
      console.log(`Created module: ${module.title}`);
    }

    console.log('Modules seeded successfully');
  } catch (error) {
    console.error('Error seeding modules:', error);
  }
};

const seedLessons = async () => {
  try {
    // Clear existing lessons
    await Lesson.deleteMany({});
    console.log('Cleared existing lessons');

    // Get modules for reference
    const jsModule = await Module.findOne({ id: 'javascript-fundamentals' });
    const solidityModule = await Module.findOne({ id: 'solidity-smart-contracts' });

    // Seed JavaScript lessons
    if (jsModule) {
      for (const lessonData of jsLessons) {
        const lesson = new Lesson({
          ...lessonData,
          moduleId: jsModule._id
        });
        await lesson.save();
        console.log(`Created lesson: ${lesson.title}`);
      }
    }

    // Seed Solidity lessons
    if (solidityModule) {
      for (const lessonData of solidityLessons) {
        const lesson = new Lesson({
          ...lessonData,
          moduleId: solidityModule._id
        });
        await lesson.save();
        console.log(`Created lesson: ${lesson.title}`);
      }
    }

    console.log('Lessons seeded successfully');
  } catch (error) {
    console.error('Error seeding lessons:', error);
  }
};

const seedData = async () => {
  await connectDB();
  await seedModules();
  await seedLessons();
  console.log('Database seeding completed');
  process.exit(0);
};

// Run if called directly
if (require.main === module) {
  seedData();
}

module.exports = { seedData, seedModules, seedLessons };
