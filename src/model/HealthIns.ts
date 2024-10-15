import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const HealthIns = sequelize.define(
  'HealthIns',
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
    tableName: 'health_in',
    paranoid: true,
    timestamps: true,
  }
)


export default HealthIns