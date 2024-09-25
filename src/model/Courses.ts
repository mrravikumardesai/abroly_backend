import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const Courses = sequelize.define(
  'Courses',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    is_public:{
      type:DataTypes.TINYINT,
      defaultValue:0
    },
    // for future reference only
    duration: {
      type: DataTypes.TEXT,
    },
    level: {
      type: DataTypes.ENUM("beginner","intermediate","expert"),
      defaultValue:"beginner"
    },
    price:{
      type:DataTypes.STRING
    }
  },
  {
    tableName: 'courses',
    paranoid: true,
    timestamps: true,
  }
)


export default Courses