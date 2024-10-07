import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const ContentWritingSubPoints = sequelize.define(
  'ContentWritingSubPoints',
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
    content_writing_uuid:{
      type:DataTypes.STRING
    },
    title: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    image:{
      type:DataTypes.STRING
    },
    point_order:{
      type:DataTypes.INTEGER
    },
    is_image:{
      type:DataTypes.TINYINT,
      defaultValue:0
    }
  },
  {
    tableName: 'content_writing_sub_points',
    paranoid: true,
    timestamps: true,
  }
)


export default ContentWritingSubPoints