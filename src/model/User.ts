import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const User = sequelize.define(
  'User',
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING
    },
    country_code: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        return this.country_code !== null && this.phone_number !== null ? this.country_code + "" + this.phone_number : null
      },
    },
    profile_image: {
      type: DataTypes.STRING,
    },
    access_profile: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        return this.profile_image && this.profile_image !== "" ? `${process.env.LOCAL_PATH}public/profiles/${this.profile_image}` : null
      },
    },
    status: {
      type: DataTypes.TINYINT,
      defaultValue: 1
    },
    user_type: {
      type: DataTypes.ENUM("user"),
      defaultValue: "user"
    },
    otp:
    {
      type: DataTypes.STRING
    },
    otp_expire:
    {
      type: DataTypes.DATE
    },
    is_verified:
    {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
  },
  {
    tableName: 'user',
    paranoid: true,
    timestamps: true,
  }
)





export default User