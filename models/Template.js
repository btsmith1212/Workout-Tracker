const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Template extends Model {}

Template.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    day_of_week: {
      type: DataTypes.STRING, // day of week (ie "Monday")
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    workout_name1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps1: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workout_name2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workout_name3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps3: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workout_name4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps4: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workout_name5: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sets5: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    reps5: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'template',
  }
);

module.exports = Template;
