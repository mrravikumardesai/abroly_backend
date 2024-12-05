import { DataTypes } from 'sequelize';
import EventBanner from './EventBanner'; // Import the EventBanner model
import sequelize from '../config/dbconfig';

const EventBannerImage = sequelize.define('EventBannerImage', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    eventBannerId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.VIRTUAL,
        get(this: any) {
          return this.imageUrl && this.imageUrl !== "" ? `${process.env.LOCAL_PATH}public/event_images/${this.imageUrl}` : null
        },
    },
}, {
    tableName: 'event_banner_images', // Optional: specify the table name if different
    timestamps: true, // Optional: if you want to include createdAt and updatedAt
});


export default EventBannerImage; 
