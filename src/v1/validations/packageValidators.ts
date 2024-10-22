import Joi from 'joi';

export const validateAddPackage = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().optional(),
        category: Joi.string().valid('Agent/Consultant', 'Tours & Travel').required(),
        leadLimit: Joi.number().integer().optional(),
        teamLimit: Joi.number().integer().optional(),
        jobPostLimit: Joi.number().integer().optional(),
        tourPostLimit: Joi.number().integer().optional(),
        travelLeadLimit: Joi.number().integer().optional(),
        profilePinning: Joi.string().optional(),
        eventBanner: Joi.string().optional(),
        price: Joi.number().required(),
    });
    return schema.validate(data);
};

export const validateUpdatePackage = (data: any) => {
    const schema = Joi.object({
        uuid: Joi.string().guid({ version: 'uuidv4' }).required(),
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        category: Joi.string().valid('Agent/Consultant', 'Tours & Travel').optional(),
        leadLimit: Joi.number().integer().optional(),
        teamLimit: Joi.number().integer().optional(),
        jobPostLimit: Joi.number().integer().optional(),
        tourPostLimit: Joi.number().integer().optional(),
        travelLeadLimit: Joi.number().integer().optional(),
        profilePinning: Joi.string().optional(),
        eventBanner: Joi.string().optional(),
        price: Joi.number().optional(),
    });
    return schema.validate(data);
};
