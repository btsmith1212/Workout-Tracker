const sequelize = require('../config/connection');
const { User, Template } = require('../models');

const userData = require('./userData.json');
const templateData = require('./templateData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const template of templateData) {
    await Template.create({
      ...template,
    });
  }

  process.exit(0);
};

seedDatabase();
