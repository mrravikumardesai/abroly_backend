import { DataTypes } from 'sequelize';
import EventBanner from './EventBanner'; // Import the EventBanner model
import sequelize from '../config/dbconfig';

const EventBannerImage = sequelize.define('EventBannerImage', {
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    eventBannerId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: EventBanner,
            key: 'uuid',
        },
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'event_banner_images', // Optional: specify the table name if different
    timestamps: true, // Optional: if you want to include createdAt and updatedAt
});

export default EventBannerImage; 