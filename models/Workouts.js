const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workouts extends Model {}

Workouts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING, // name of workout (ie "Bicep Curls")
      allowNull: false,
    },
    workoutType: {
      type: DataTypes.STRING, // cardio, strength, etc
      allowNull: false,
    },
    measurementType: {
      type: DataTypes.INTEGER, // length,distance, reps, etc
      allowNull: false,
    },
    template_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'template',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workout',
  }
);

module.exports = Workouts;

// Workouts table will contain all the pre-canned workouts, connect them to your templates table, and entries table will connect to this one.
