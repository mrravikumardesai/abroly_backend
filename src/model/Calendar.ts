import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const Calendar = sequelize.define(
  'Calendar',
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
    assign_by:{
      type:DataTypes.STRING
    },
    assgin_to:{
      type:DataTypes.STRING
    },
    title:{
      type:DataTypes.TEXT
    },
    description:{
      type:DataTypes.TEXT
    },
    application_uuid:{
      type:DataTypes.STRING
    },
    event_type:{
      type:DataTypes.ENUM("event",'reminder','followup','task'),
      defaultValue:"task"
    },
    start_time:{
      type:DataTypes.TIME
    },
    end_time:{
      type:DataTypes.TIME
    },
    date:{
      type:DataTypes.DATE
    },
    is_done:{
      type:DataTypes.TINYINT,
      defaultValue:0
    }
  },
  {
    tableName: 'calendar',
    paranoid: true,
    timestamps: true,
  }
)




export default Calendar