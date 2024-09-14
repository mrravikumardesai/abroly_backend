import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const ContactUs = sequelize.define(
  'ContactUs',
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
    number: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    message:{
      type:DataTypes.TEXT
    },
  },
  {
    tableName: 'contact_us',
    paranoid: true,
    timestamps: true,
  }
)




export default ContactUs