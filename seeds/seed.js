const sequelize = require('../config/connection');
const { User, Workouts, Template } = require('../models');

const userData = require('./userData.json');
const workoutData = require('./workoutData.json');
const templateData = require('./templateData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const workout of workoutData) {
    await Workouts.create({
      ...workout,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const template of templateData) {
    await Template.create({
      ...template,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
