import { DataType, DataTypes, ModelDefined, Optional, TinyIntegerDataType } from "sequelize";
import sequelize from "../config/dbconfig";

const ContentWritingServicesResponsesFiles = sequelize.define(
  'ContentWritingServicesResponsesFiles',
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
    ref_uuid:{
      type:DataTypes.STRING
    },
    file_name: {
      type: DataTypes.TEXT,
    },
    access_file: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        return this.file_name !== "" && this.file_name !== null ? `${process.env.LOCAL_PATH}public/content_writing_files/${this.file_name}` : null
      },
    },
    file_type: {
      type: DataTypes.ENUM("pdf","image", "other"),
      defaultValue:"pdf"
    },
  },
  {
    tableName: 'content_writing_services_responses_files',
    paranoid: true,
    timestamps: true,
  }
)


export default ContentWritingServicesResponsesFiles