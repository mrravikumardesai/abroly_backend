// models/Application.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

const Application = sequelize.define('Application', {
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
    student_uuid:{
        type:DataTypes.STRING
    },
    status:{
        type:DataTypes.ENUM("pending",'in_progress','completed'),
        defaultValue:"pending"
    }
}, {
    tableName: 'application',
    timestamps: true,
    paranoid: true
});

export default Application;
