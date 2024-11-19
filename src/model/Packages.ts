import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";



const Package = sequelize.define('Package', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,

  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM('consultant', 'tours_travels', "job_post"),
  },
  leadLimit: { type: DataTypes.STRING },
  teamLimit: { type: DataTypes.STRING },
  jobPostLimit: {
    type: DataTypes.STRING,
    defaultValue: 0
  },
  job_post_days: {
    type: DataTypes.STRING,
    defaultValue: "0"
  },
  price: {
    type: DataTypes.STRING,
  },
  achievement_banner: {
    type: DataTypes.STRING,
    defaultValue: 0
  },
}, {
  tableName: 'package',
  timestamps: true,
  paranoid: true
});

export default Package;
