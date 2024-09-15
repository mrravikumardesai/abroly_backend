import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const Testimonial = sequelize.define(
  'Testimonial',
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
    name: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.TEXT,
    },
    file_url:{
      type:DataTypes.STRING
    },
    file_type:{
      type:DataTypes.ENUM("image","video"),
      defaultValue:"video"
    },
    access_file: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        return this.file_url && this.file_url !== "" ? `${process.env.LOCAL_PATH}public/testimonials/${this.file_url}` : null
      },
    },
  },
  {
    tableName: 'testimonial',
    paranoid: true,
    timestamps: true,
  }
)


export default Testimonial