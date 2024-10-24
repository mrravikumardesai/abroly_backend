import express from 'express';
import AgentController from '../controller/AgentController';
import validationBodyMw from '../../middleware/validateBody';
import { loginWithNumberValidation, otpValidation, sinupWithNumberValidation } from '../validations/userValidations';
import { AgentNumberExistMw, numberExistMw } from '../../middleware/validateExistMiddleware';
import { validateAdmin, validateAgent } from '../../middleware/authMiddleware';

const agentRoutes = express.Router();

agentRoutes.route("/validate_otp").post(validationBodyMw(otpValidation), AgentController.validateOTP)
agentRoutes.route("/validate_otp_custom").post(AgentController.validateOTPCustom)
agentRoutes.route("/login_with_number").post(validationBodyMw(loginWithNumberValidation), AgentController.loginWithNumber)
agentRoutes.route("/login_with_number_custom").post(validationBodyMw(loginWithNumberValidation), AgentController.loginWithNumberCustom)
agentRoutes.route("/signup").post(validationBodyMw(sinupWithNumberValidation), AgentNumberExistMw, AgentController.signup)
agentRoutes.route("/signup_custom").post(validationBodyMw(sinupWithNumberValidation), AgentNumberExistMw, AgentController.signupCustom)

agentRoutes.route("/kyc").post(validateAgent, AgentController.kycTokenType)

// agent listing in admin 
agentRoutes.route("/list_agents").post(validateAdmin, AgentController.agentListing)
agentRoutes.route("/create").post(validateAdmin,validationBodyMw(sinupWithNumberValidation), AgentNumberExistMw, AgentController.agentCreate)
agentRoutes.route("/update").post(validateAdmin,AgentController.agentUpdate)
agentRoutes.route("/toggle").post(validateAdmin,AgentController.toggleAgent)

export default agentRoutes;
