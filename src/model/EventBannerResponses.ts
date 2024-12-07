import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const EventBannerResponses = sequelize.define(
  'EventBannerResponses',
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
    email: {
      type: DataTypes.TEXT,
    },
    phone_number: {
      type: DataTypes.TEXT,
    },
    event_id: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'event_banner_responses',
    paranoid: true,
    timestamps: true,
  }
)


export default EventBannerResponses