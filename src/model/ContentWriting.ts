import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const ContentWriting = sequelize.define(
  'ContentWriting',
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
    name: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    key:{
      type:DataTypes.STRING
    }
  },
  {
    tableName: 'content_writing',
    paranoid: true,
    timestamps: true,
  }
)


export default ContentWriting