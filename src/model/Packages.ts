const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Package = sequelize.define('Package', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUIDV4,
        defaultValue:DataTypes.UUIDV4
    },
    name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM('Agent/Consultant', 'Tours & Travel'),
    allowNull: false
  },
  leadLimit: DataTypes.INTEGER,
  teamLimit: DataTypes.INTEGER,
  jobPostLimit: DataTypes.INTEGER,
  tourPostLimit: DataTypes.INTEGER,
  travelLeadLimit: DataTypes.INTEGER,
  profilePinning: DataTypes.STRING,
  eventBanner: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
    tableName: 'package',
    timestamps: true,
});

module.exports = Package;
