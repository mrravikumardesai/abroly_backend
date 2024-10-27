import express from 'express'
import { validateAgent } from '../../middleware/authMiddleware'
import CalendarController from '../controller/CalendarController'

const calendarRoutes = express.Router()


// for sub agent

const subAgentRotues = express.Router()

// add 
subAgentRotues.route("/add").post(validateAgent,CalendarController.eventCreate)
subAgentRotues.route("/action").post(validateAgent,CalendarController.actionEvent)
subAgentRotues.route("/list").post(validateAgent,CalendarController.listEvents)

// update

// list

// delete

// mark done undone

calendarRoutes.use("/sub_agent",subAgentRotues)
// for agent
const agentRoutes = express.Router()

agentRoutes.route("/add").post(validateAgent,CalendarController.eventAddAgent)
agentRoutes.route("/list").post(validateAgent,CalendarController.agentListEvent)

calendarRoutes.use("/agent",agentRoutes)

export default calendarRoutes