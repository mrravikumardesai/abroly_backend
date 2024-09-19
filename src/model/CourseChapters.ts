import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const CourseChapters = sequelize.define(
  'CourseChapters',
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
    course_uuid: {
      type: DataTypes.TEXT,
    },
    chapter_name: {
      type: DataTypes.TEXT,
    },
    description:{
      type:DataTypes.TEXT
    }
  },
  {
    tableName: 'course_chapters',
    paranoid: true,
    timestamps: true,
  }
)


export default CourseChapters