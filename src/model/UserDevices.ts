
import { DataTypes } from "sequelize";
import sequelize from "../config/dbconfig";


const UserDevices = sequelize.define(
    'UserDevices',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        user_uuid: {
            type: DataTypes.STRING
        },
        device_id: {
            type: DataTypes.TEXT
        },
        device_token: {
            type: DataTypes.TEXT
        },
        device_model:{
            type:DataTypes.STRING
        }
    },
    {
        tableName: "user_devices",
        paranoid: true,
        timestamps: true
    }
)

export default UserDevices