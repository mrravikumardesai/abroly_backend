import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const EventBanner = sequelize.define('EventBanner', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    heading: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descriptive_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'event_banners', // Optional: specify the table name if different
    timestamps: true, // Optional: if you want to include createdAt and updatedAt
});

export default EventBanner; 