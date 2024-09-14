import express from "express"
import userRoutes from "./userRoutes"
import visaTypeRoutes from "./visaTypeRoutes"

import staticRoutes from "./staticRoutes"
import contactUsRoutes from "./contactUsRoutes"



const v1_routes = express.Router()

v1_routes.use("/user",userRoutes)
v1_routes.use("/visa_type",visaTypeRoutes)
v1_routes.use("/static",staticRoutes)
v1_routes.use("/contact_us",contactUsRoutes)


export default v1_routes