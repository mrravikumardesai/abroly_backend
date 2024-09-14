import Joi from 'joi';
import generateValidationMessages from '.';

const signupValidation = Joi.object({
  user_name: Joi.string().min(3).max(30).required().messages(generateValidationMessages('User Name')),
  // email: Joi.string().email().required().messages(generateValidationMessages('Email')),
  password: Joi.string().min(8).required().messages(generateValidationMessages('Password')),
  description: Joi.string().messages(generateValidationMessages('Description')),
  signup_as: Joi.string().valid("seller", "user").required().messages(generateValidationMessages('Register as')),
});

const loginValidation = Joi.object({
  email: Joi.string().email().required().messages(generateValidationMessages('Email')),
  password: Joi.string().required().messages(generateValidationMessages('Password')),
})


const updateProfileValidation = Joi.object({
  // username: Joi.string().min(2).messages(generateValidationMessages('User Name')),
  // description: Joi.string().min(4).messages(generateValidationMessages('Description')),
})


const kycTokenValidation = Joi.object({
  authentication: Joi.string().min(10).messages(generateValidationMessages('authentication')),
})

const sinupWithNumberValidation = Joi.object({
  phone_number: Joi.string().regex(/^[0-9]{10}$/).required().messages(generateValidationMessages('Phone Number')),
  country_code: Joi.string().regex(/^\+\d+$/).required().messages(generateValidationMessages('Country Code')),
  user_name: Joi.string().min(3).max(30).required().messages(generateValidationMessages('User Name')),
  email: Joi.allow().messages(generateValidationMessages('email')),
})


const loginWithNumberValidation = Joi.object({
  phone: Joi.string().regex(/^[0-9]{10}$/).required().messages(generateValidationMessages('Phone Number')),
  country_code: Joi.string().regex(/^\+\d+$/).required().messages(generateValidationMessages('Country Code')),
})

const otpValidation = Joi.object({
  phone_number: Joi.string().regex(/^[0-9]{10}$/).required().messages(generateValidationMessages('Phone Number')),
  country_code: Joi.string().regex(/^\+\d+$/).required().messages(generateValidationMessages('Country Code')),
  // otp: Joi.string().min(6).max(6).required().messages(generateValidationMessages('OTP')),
  otp: Joi.string().min(4).max(4).required().messages(generateValidationMessages('OTP')),
  device_token: Joi.string().allow(null, '').messages(generateValidationMessages('device_token')),
  verificationId: Joi.string().required().messages(generateValidationMessages('verificationId')),
  device_id: Joi.string().messages(generateValidationMessages('device_id')),
  device_model: Joi.string().messages(generateValidationMessages('device_model')),
})
const otpValidationCustom = Joi.object({
  phone_number: Joi.string().regex(/^[0-9]{10}$/).required().messages(generateValidationMessages('Phone Number')),
  country_code: Joi.string().regex(/^\+\d+$/).required().messages(generateValidationMessages('Country Code')),
  // otp: Joi.string().min(6).max(6).required().messages(generateValidationMessages('OTP')),
  verificationId: Joi.string().empty().messages(generateValidationMessages('verificationId')),
  otp: Joi.string().min(4).max(4).required().messages(generateValidationMessages('OTP')),
  device_token: Joi.string().allow(null, '').messages(generateValidationMessages('device_token')),
  device_id: Joi.string().messages(generateValidationMessages('device_id')),
  device_model: Joi.string().messages(generateValidationMessages('device_model')),
})


export { signupValidation, loginValidation, updateProfileValidation, kycTokenValidation, sinupWithNumberValidation,otpValidation,otpValidationCustom ,loginWithNumberValidation}
