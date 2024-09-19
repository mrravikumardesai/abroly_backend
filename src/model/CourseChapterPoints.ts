import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const CourseChapterPoints = sequelize.define(
  'CourseChapterPoints',
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
    chapter_uuid: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.TEXT,
    },
    short_description:{
      type:DataTypes.TEXT
    },
    file: {
      type: DataTypes.TEXT,
    },
    file_type: {
      type: DataTypes.ENUM("pdf","image"),
      defaultValue:"pdf"
    },
  },
  {
    tableName: 'course_chapter_points',
    paranoid: true,
    timestamps: true,
  }
)


export default CourseChapterPoints