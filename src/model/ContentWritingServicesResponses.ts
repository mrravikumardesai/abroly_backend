import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const ContentWritingServicesResponses = sequelize.define(
  'ContentWritingServicesResponses',
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
    user_uuid:{
      type:DataTypes.STRING
    },
    name: {
      type: DataTypes.TEXT,
    },
    number: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
    },
    message: {
      type: DataTypes.TEXT,
    },
    selected_type: {
      type: DataTypes.ENUM("sop","motivation_letter", "cover_letter"),
      defaultValue:"sop"
    },
    payment_status:{
      type:DataTypes.ENUM("pending","rejected","paid"),
      defaultValue:"pending"
    },
    application_status:{
      type:DataTypes.ENUM("pending","in_progress","rejected","accept","pdf_provided"),
      defaultValue:"pending"
    }
  },
  {
    tableName: 'content_writing_services_responses',
    paranoid: true,
    timestamps: true,
  }
)


export default ContentWritingServicesResponses