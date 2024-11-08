import express from 'express'
import { validateAgent } from '../../middleware/authMiddleware'
import AgentProfileController from '../controller/AgentProfileController'

const agentProfileRoutes = express.Router()

// update basic profile related routes
agentProfileRoutes.route("/update_basic_profile").post(validateAgent, AgentProfileController.updateAgentDetails)

// branch office related routes
agentProfileRoutes.route("/get_branch_office_address").post(validateAgent, AgentProfileController.getBranchOfficeAddress)
agentProfileRoutes.route("/update_main_office_address").post(validateAgent, AgentProfileController.updateMainOfficeAddress)
agentProfileRoutes.route("/update_branch_office_address").post(validateAgent, AgentProfileController.updateBranchOfficeAddress)

// basic address
agentProfileRoutes.route("/get_address").post(validateAgent, AgentProfileController.getAgentOfficeAddress)
agentProfileRoutes.route("/get_about_us").post(validateAgent, AgentProfileController.getAgentAboutUs)

export default agentProfileRoutes