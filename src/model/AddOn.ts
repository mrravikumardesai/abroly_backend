// models/AddOn.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const AddOn = sequelize.define('AddOn', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
    },
    subscription_uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'subscription',
            key: 'uuid'
        }
    },
    addon_type: {
        type: DataTypes.ENUM('lead', 'team_member', 'profile_pinning', 'event_banner'),
        allowNull: false
    },
    addon_value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'addon',
    timestamps: true,
});

export default AddOn;
