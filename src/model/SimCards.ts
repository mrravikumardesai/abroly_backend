import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const SimCards = sequelize.define(
  'SimCards',
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
    details: {
      type: DataTypes.TEXT,
    },
    url:{
      type:DataTypes.TEXT
    }
  },
  {
    tableName: 'sim_cards',
    paranoid: true,
    timestamps: true,
  }
)


export default SimCards