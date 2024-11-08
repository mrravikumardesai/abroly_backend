import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

// Agent Profile Model
// This model stores the primary details of an agent, including its main office address, contact information, operating hours, etc.
const AgentProfile = sequelize.define('AgentProfile', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  agent_uuid: { type: DataTypes.STRING },
  // Primary office address fields
  officeStreetAddress: { type: DataTypes.STRING }, // Street address of the main office
  officeCity: { type: DataTypes.STRING }, // City of the main office
  officeStateProvince: { type: DataTypes.STRING }, // State or province of the main office
  officeCountry: { type: DataTypes.STRING }, // Country of the main office
  officePostalCode: { type: DataTypes.STRING }, // Postal code of the main office

  // Agent description fields
  aboutUs: { type: DataTypes.TEXT }, // Brief background or overview of the agent
  detailedDescription: { type: DataTypes.TEXT }, // Detailed description of the agent's services and specializations

  // Online presence fields
  website: { type: DataTypes.STRING }, // Website URL of the agent
  socialFacebook: { type: DataTypes.STRING }, // Facebook profile URL
  socialInstagram: { type: DataTypes.STRING }, // Instagram profile URL
  socialLinkedIn: { type: DataTypes.STRING }, // LinkedIn profile URL
  socialTwitter: { type: DataTypes.STRING }, // Twitter profile URL
  socialYouTube: { type: DataTypes.STRING }, // YouTube channel URL
  socialOther: { type: DataTypes.STRING }, // Additional social media or online platform

  // Contact information fields
  contactEmail: { type: DataTypes.STRING }, // Primary contact email
  contactPhoneNumber: { type: DataTypes.STRING }, // Primary contact phone number
  contactWhatsApp: { type: DataTypes.STRING }, // WhatsApp contact number
  otherCommunicationChannels: { type: DataTypes.STRING }, // Any other communication methods, e.g., Skype, Telegram

  // Operating hours fields
  operatingHoursWeekdays: { type: DataTypes.STRING }, // Weekday operating hours (e.g., "9:00 AM – 6:00 PM")
  operatingHoursWeekends: { type: DataTypes.STRING }, // Weekend operating hours (e.g., "10:00 AM – 2:00 PM")
  operatingHoursTimeZone: { type: DataTypes.STRING }, // Time zone of the operating hours (e.g., "GMT+1")
}, {
  tableName: 'agent_profiles',
  timestamps: true,
  paranoid: true
});

// Branch Office Model
// This model stores information about each branch office of the agent.
const BranchOffice = sequelize.define('BranchOffice', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  agent_uuid: { type: DataTypes.STRING },
  // Branch address fields
  streetAddress: { type: DataTypes.STRING }, // Street address of the branch
  city: { type: DataTypes.STRING }, // City of the branch
  stateProvince: { type: DataTypes.STRING }, // State or province of the branch
  country: { type: DataTypes.STRING }, // Country where the branch is located
  postalCode: { type: DataTypes.STRING }, // Postal code of the branch

  // Foreign key to associate branch with an agent profile
  agentProfileUUID: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'branch_offices',
  timestamps: true,
  paranoid: true
});

// Certification and Accreditation Model
// This model stores certifications and accreditations associated with the agent.
const Certification = sequelize.define('Certification', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  certificationName: { type: DataTypes.STRING }, // Name of the certification or accreditation (e.g., "ICEF")
  accreditationBody: { type: DataTypes.STRING }, // The body that granted the certification (optional)
  agent_uuid: { type: DataTypes.STRING },
  name: { type: DataTypes.TEXT },
  type: { type: DataTypes.ENUM("pdf", "image","other"), defaultValue: "pdf" },
  access_file: {
    type: DataTypes.VIRTUAL,
    get(this: any) {
      return this.name && this.name !== "" ? `${process.env.LOCAL_PATH}public/certificates/${this.name}` : null
    },
  },

  // Foreign key to associate certification with an agent profile
  agentProfileUUID: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'certifications',
  timestamps: true,
  paranoid: true
});

// Language Model
// This model stores the languages spoken or supported by the agent.
const Language = sequelize.define('Language', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
  language: { type: DataTypes.STRING }, // Name of the language (e.g., "English", "Spanish")
  agent_uuid: { type: DataTypes.STRING },
  // Foreign key to associate language with an agent profile
  agentProfileUUID: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'languages',
  timestamps: true,
  paranoid: true
});


export { AgentProfile, BranchOffice, Certification, Language };

