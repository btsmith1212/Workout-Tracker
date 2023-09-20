const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Entries extends Model {}

Entries.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actualSets: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actualReps: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actualDistance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actualLength: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workout_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'workout',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'entries',
  }
);

module.exports = Entries;
