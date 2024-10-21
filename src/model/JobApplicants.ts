import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const JobApplicants = sequelize.define(
  'JobApplicants',
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
    job_post_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_uuid: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM("pending", "accept", "reject"),
      defaultValue: "pending"
    },
    reason: {
      type: DataTypes.TEXT
    }
  },
  {
    tableName: 'job_applicants',
    paranoid: true,
    timestamps: true,
  }
)

export default JobApplicants