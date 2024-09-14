
function generateValidationMessages(fieldName: string) {
    return {
        'string.base': `${fieldName} must be a string`,
        'string.empty': `${fieldName} cannot be empty`,
        'string.min': `${fieldName} should have a minimum length of {#limit}`,
        'string.max': `${fieldName} should have a maximum length of {#limit}`,
        'string.email': `Please enter a valid ${fieldName}`,
        'string.pattern.base': `${fieldName} format is invalid`,
        'number.base': `${fieldName} must be a number`,
        'number.min': `${fieldName} must be at least {#limit}`,
        'number.max': `${fieldName} must be less than or equal to {#limit}`,
        'number.unsafe': `${fieldName} is out of safe range`,
        'date.base': `${fieldName} must be a valid date`,
        'date.format': `${fieldName} should be in {#format} format`,
        'any.required': `${fieldName} is required`,
        'boolean.base': `${fieldName} must be a boolean`,
        'array.base': `${fieldName} must be an array`,
        'array.min': `${fieldName} must contain at least {#limit} items`,
        'array.max': `${fieldName} must contain less than or equal to {#limit} items`,
        'object.base': `${fieldName} must be an object`,
        'object.min': `${fieldName} must have at least {#limit} children`,
        'object.max': `${fieldName} must have less than or equal to {#limit} children`,
    };
}

export default generateValidationMessages