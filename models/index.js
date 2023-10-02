const User = require('./User');
const Template = require('./Template');

User.hasMany(Template, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Template.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Template };
