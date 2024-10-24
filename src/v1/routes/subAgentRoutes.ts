import express from 'express'
import { validateAgent } from '../../middleware/authMiddleware'
import SubAgentControlleṛ from '../controller/SubAgentControlleṛ'
import { numberExistMw } from '../../middleware/validateExistMiddleware'

const subAgentRoutes = express.Router()


subAgentRoutes.route("/add").post(validateAgent,numberExistMw,SubAgentControlleṛ.addSubAgent)
subAgentRoutes.route("/can_add").get(validateAgent,SubAgentControlleṛ.canAddSubAgents)
subAgentRoutes.route("/update").post(validateAgent,SubAgentControlleṛ.agentUpdate)
subAgentRoutes.route("/delete").post(validateAgent,SubAgentControlleṛ.deleteSubAgent)
subAgentRoutes.route("/toggle").post(validateAgent,SubAgentControlleṛ.toggleSubAgent)
subAgentRoutes.route("/list").post(validateAgent,SubAgentControlleṛ.listSubAgent)

export default subAgentRoutes