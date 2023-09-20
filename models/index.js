const User = require('./User');
const Template = require('./Template');
const Workouts = require('./Workouts');
const Entries = require('./Entries');

User.hasMany(Template, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Template.hasMany(Workouts, {
  foreignKey: 'template_id',
  onDelete: 'CASCADE',
});

Workouts.hasMany(Entries, {
  foreignKey: 'workout_id',
  onDelete: 'CASCADE',
});

Template.belongsTo(User, {
  foreignKey: 'user_id',
});

Workouts.belongsTo(Template, {
  foreignKey: 'template_id',
});

Entries.belongsTo(Workouts, {
  foreignKey: 'workout_id',
});

module.exports = { User, Template, Workouts, Entries };
