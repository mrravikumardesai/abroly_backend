import { DataTypes } from 'sequelize';
import sequelize from '../config/dbconfig';

  // Agency Profile Model
  // This model stores the primary details of an agency, including its main office address, contact information, operating hours, etc.
  const AgencyProfile = sequelize.define('AgencyProfile', {
    // Primary office address fields
    officeStreetAddress: { type: DataTypes.STRING }, // Street address of the main office
    officeCity: { type: DataTypes.STRING }, // City of the main office
    officeStateProvince: { type: DataTypes.STRING }, // State or province of the main office
    officeCountry: { type: DataTypes.STRING }, // Country of the main office
    officePostalCode: { type: DataTypes.STRING }, // Postal code of the main office

    // Agency description fields
    aboutUs: { type: DataTypes.TEXT }, // Brief background or overview of the agency
    detailedDescription: { type: DataTypes.TEXT }, // Detailed description of the agency's services and specializations

    // Online presence fields
    website: { type: DataTypes.STRING }, // Website URL of the agency
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
    tableName: 'agency_profiles',
    timestamps: false,
  });

  // Branch Office Model
  // This model stores information about each branch office of the agency.
  const BranchOffice = sequelize.define('BranchOffice', {
    // Branch address fields
    streetAddress: { type: DataTypes.STRING }, // Street address of the branch
    city: { type: DataTypes.STRING }, // City of the branch
    stateProvince: { type: DataTypes.STRING }, // State or province of the branch
    country: { type: DataTypes.STRING }, // Country where the branch is located
    postalCode: { type: DataTypes.STRING }, // Postal code of the branch

    // Foreign key to associate branch with an agency profile
    agencyProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: AgencyProfile,
        key: 'id'
      }
    }
  }, {
    tableName: 'branch_offices',
    timestamps: false,
  });

  // Certification and Accreditation Model
  // This model stores certifications and accreditations associated with the agency.
  const Certification = sequelize.define('Certification', {
    certificationName: { type: DataTypes.STRING }, // Name of the certification or accreditation (e.g., "ICEF")
    accreditationBody: { type: DataTypes.STRING }, // The body that granted the certification (optional)

    // Foreign key to associate certification with an agency profile
    agencyProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: AgencyProfile,
        key: 'id'
      }
    }
  }, {
    tableName: 'certifications',
    timestamps: false,
  });

  // Language Model
  // This model stores the languages spoken or supported by the agency.
  const Language = sequelize.define('Language', {
    language: { type: DataTypes.STRING }, // Name of the language (e.g., "English", "Spanish")

    // Foreign key to associate language with an agency profile
    agencyProfileId: {
      type: DataTypes.INTEGER,
      references: {
        model: AgencyProfile,
        key: 'id'
      }
    }
  }, {
    tableName: 'languages',
    timestamps: false,
  });


  export { AgencyProfile, BranchOffice, Certification, Language };

