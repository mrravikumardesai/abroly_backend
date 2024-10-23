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
    type: DataTypes.ENUM('Agent/Consultant', 'Tours & Travel'),
   
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
   
  }
}, {
  tableName: 'package',
  timestamps: true,
  paranoid:true
});

export default Package;
