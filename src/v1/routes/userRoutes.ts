import express from 'express'
import UserController from '../controller/UserController'
import { validateAdminOrManager, validateGeneral } from '../../middleware/authMiddleware'
import { loginWithNumberValidation, otpValidation, sinupWithNumberValidation } from '../validations/userValidations'
import validationBodyMw from '../../middleware/validateBody'
import { numberExistMw } from '../../middleware/validateExistMiddleware'

const userRoutes = express.Router()

userRoutes.route("/signup_with_number").post(validationBodyMw(sinupWithNumberValidation), numberExistMw, UserController.signupWithNumber)
userRoutes.route("/signup_with_number_custom").post(validationBodyMw(sinupWithNumberValidation), numberExistMw, UserController.signupWithNumberCustom)
userRoutes.route("/validate_otp").post(validationBodyMw(otpValidation), UserController.validateOTP)
userRoutes.route("/validate_otp_custom").post( UserController.validateOTPCUstom)
userRoutes.route("/login_with_number").post(validationBodyMw(loginWithNumberValidation), UserController.loginWithNumber)
userRoutes.route("/login_with_number_custom").post(validationBodyMw(loginWithNumberValidation), UserController.loginWithNumberCustomLogic)
userRoutes.route("/logout_user").post(validateGeneral, UserController.logoutUser)

// admim Login

const adminRoutes = express.Router()

adminRoutes.route("/validate_otp").post(validationBodyMw(otpValidation), UserController.AdminValidateOTP)
adminRoutes.route("/validate_otp_custom").post( UserController.AdminValidateOTPCUstom)
adminRoutes.route("/login_with_number").post(validationBodyMw(loginWithNumberValidation), UserController.adminLoginWithNumber)
adminRoutes.route("/login_with_number_custom").post(validationBodyMw(loginWithNumberValidation), UserController.AdminLoginWithNumberCustomLogic)

userRoutes.use("/admin",adminRoutes)



// know your customer 
userRoutes.route("/kyc").post(validateGeneral, UserController.kycTokenType)


export default userRoutes