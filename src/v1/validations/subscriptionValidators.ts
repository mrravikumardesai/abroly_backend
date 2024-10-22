import Joi from 'joi';

export const validateAddSubscription = (data) => {
    const schema = Joi.object({
        agent_uuid: Joi.string().guid({ version: ['uuidv4'] }).required().messages({
            'string.guid': `"agent_uuid" must be a valid UUIDv4`,
            'any.required': `"agent_uuid" is required`
        }),
        package_uuid: Joi.string().guid({ version: ['uuidv4'] }).required().messages({
            'string.guid': `"package_uuid" must be a valid UUIDv4`,
            'any.required': `"package_uuid" is required`
        }),
        leads_remaining: Joi.number().integer().min(0).required().messages({
            'number.base': `"leads_remaining" must be a number`,
            'number.integer': `"leads_remaining" must be an integer`,
            'number.min': `"leads_remaining" must be at least 0`,
            'any.required': `"leads_remaining" is required`
        }),
        team_member_limit: Joi.number().integer().min(0).required().messages({
            'number.base': `"team_member_limit" must be a number`,
            'number.integer': `"team_member_limit" must be an integer`,
            'number.min': `"team_member_limit" must be at least 0`,
            'any.required': `"team_member_limit" is required`
        }),
        job_post_limit: Joi.number().integer().min(0).required().messages({
            'number.base': `"job_post_limit" must be a number`,
            'number.integer': `"job_post_limit" must be an integer`,
            'number.min': `"job_post_limit" must be at least 0`,
            'any.required': `"job_post_limit" is required`
        }),
        tour_post_limit: Joi.number().integer().min(0).required().messages({
            'number.base': `"tour_post_limit" must be a number`,
            'number.integer': `"tour_post_limit" must be an integer`,
            'number.min': `"tour_post_limit" must be at least 0`,
            'any.required': `"tour_post_limit" is required`
        }),
        travel_lead_limit: Joi.number().integer().min(0).required().messages({
            'number.base': `"travel_lead_limit" must be a number`,
            'number.integer': `"travel_lead_limit" must be an integer`,
            'number.min': `"travel_lead_limit" must be at least 0`,
            'any.required': `"travel_lead_limit" is required`
        }),
        profile_pinning_weeks: Joi.number().integer().min(0).required().messages({
            'number.base': `"profile_pinning_weeks" must be a number`,
            'number.integer': `"profile_pinning_weeks" must be an integer`,
            'number.min': `"profile_pinning_weeks" must be at least 0`,
            'any.required': `"profile_pinning_weeks" is required`
        }),
        event_banner_count: Joi.number().integer().min(0).required().messages({
            'number.base': `"event_banner_count" must be a number`,
            'number.integer': `"event_banner_count" must be an integer`,
            'number.min': `"event_banner_count" must be at least 0`,
            'any.required': `"event_banner_count" is required`
        }),
        subscription_start_date: Joi.date().required().messages({
            'date.base': `"subscription_start_date" must be a valid date`,
            'any.required': `"subscription_start_date" is required`
        }),
    });

    return schema.validate(data);
};

export const validateUpdateSubscription = (data) => {
    const schema = Joi.object({
        uuid: Joi.string().guid({ version: ['uuidv4'] }).required().messages({
            'string.guid': `"uuid" must be a valid UUIDv4`,
            'any.required': `"uuid" is required`
        }),
        leads_remaining: Joi.number().integer().min(0).optional().messages({
            'number.base': `"leads_remaining" must be a number`,
            'number.integer': `"leads_remaining" must be an integer`,
            'number.min': `"leads_remaining" must be at least 0`
        }),
        team_member_limit: Joi.number().integer().min(0).optional().messages({
            'number.base': `"team_member_limit" must be a number`,
            'number.integer': `"team_member_limit" must be an integer`,
            'number.min': `"team_member_limit" must be at least 0`
        }),
        job_post_limit: Joi.number().integer().min(0).optional().messages({
            'number.base': `"job_post_limit" must be a number`,
            'number.integer': `"job_post_limit" must be an integer`,
            'number.min': `"job_post_limit" must be at least 0`
        }),
        tour_post_limit: Joi.number().integer().min(0).optional().messages({
            'number.base': `"tour_post_limit" must be a number`,
            'number.integer': `"tour_post_limit" must be an integer`,
            'number.min': `"tour_post_limit" must be at least 0`
        }),
        travel_lead_limit: Joi.number().integer().min(0).optional().messages({
            'number.base': `"travel_lead_limit" must be a number`,
            'number.integer': `"travel_lead_limit" must be an integer`,
            'number.min': `"travel_lead_limit" must be at least 0`
        }),
        profile_pinning_weeks: Joi.number().integer().min(0).optional().messages({
            'number.base': `"profile_pinning_weeks" must be a number`,
            'number.integer': `"profile_pinning_weeks" must be an integer`,
            'number.min': `"profile_pinning_weeks" must be at least 0`
        }),
        event_banner_count: Joi.number().integer().min(0).optional().messages({
            'number.base': `"event_banner_count" must be a number`,
            'number.integer': `"event_banner_count" must be an integer`,
            'number.min': `"event_banner_count" must be at least 0`
        }),
    });

    return schema.validate(data);
};