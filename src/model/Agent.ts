import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";

const Agent = sequelize.define('Agent', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    phone_number: {
        type: DataTypes.STRING,
    },
    country_code:{
        type:DataTypes.STRING,
        defaultValue:"+91"
    },
    username: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM("agent", "sub-agent", "visa-agent", "tour-agent"), // Define main roles
        defaultValue:"agent"
    },
    status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
    },
    otp: {
        type: DataTypes.STRING
    },
    is_verified: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    },
    profile_image:{
        type:DataTypes.STRING
    },
    access_profile: {
        type: DataTypes.VIRTUAL,
        get(this: any) {
          return this.profile_image && this.profile_image !== "" ? `${process.env.LOCAL_PATH}public/profiles/${this.profile_image}` : null
        },
      },
}, {
    tableName: 'agent',
    timestamps: true,
});

export default Agent;