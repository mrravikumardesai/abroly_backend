import express from "express"
import userRoutes from "./userRoutes"
import visaTypeRoutes from "./visaTypeRoutes"

import staticRoutes from "./staticRoutes"
import contactUsRoutes from "./contactUsRoutes"
import faqRoutes from "./faqRoutes"
import testimonialsRoutes from "./testimonialsRoutes"
import contentWritingRoutes from "./contentWritingRoutes"
import simCardsRoutes from "./simCardsRoutes"



const v1_routes = express.Router()

v1_routes.use("/user",userRoutes)
v1_routes.use("/visa_type",visaTypeRoutes)
v1_routes.use("/static",staticRoutes)
v1_routes.use("/contact_us",contactUsRoutes)
v1_routes.use("/faq",faqRoutes)
v1_routes.use("/testimonials",testimonialsRoutes)
v1_routes.use("/content_writing",contentWritingRoutes)
v1_routes.use("/sim",simCardsRoutes)


export default v1_routes