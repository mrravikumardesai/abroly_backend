import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const CourseImages = sequelize.define(
  'CourseImages',
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
    access_image: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'course_images',
    paranoid: true,
    timestamps: true,
  }
)


export default CourseImages