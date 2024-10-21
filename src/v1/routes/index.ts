import express from "express"
import userRoutes from "./userRoutes"
import visaTypeRoutes from "./visaTypeRoutes"

import staticRoutes from "./staticRoutes"
import contactUsRoutes from "./contactUsRoutes"
import faqRoutes from "./faqRoutes"
import testimonialsRoutes from "./testimonialsRoutes"
import contentWritingRoutes from "./contentWritingRoutes"
import simCardsRoutes from "./simCardsRoutes"
import contentWritinResponseRoutes from "./contentWritinResponseRoutes"
import languagePrepRoutes from "./languagePrepRoutes"
import healthInsurRoutes from "./healthInsurRoutes"
import quizRoutes from "./quizRoutes"
import agentRoutes from "./agentRoutes"
import studentRoutes from "./studentRoutes"
import jobPostRoutes from "./jobPostRoutes"



const v1_routes = express.Router()

v1_routes.use("/user", userRoutes)
v1_routes.use("/visa_type", visaTypeRoutes)
v1_routes.use("/static", staticRoutes)
v1_routes.use("/contact_us", contactUsRoutes)
v1_routes.use("/faq", faqRoutes)
v1_routes.use("/testimonials", testimonialsRoutes)
v1_routes.use("/content_writing", contentWritingRoutes)
v1_routes.use("/sim", simCardsRoutes)
v1_routes.use("/health_in", healthInsurRoutes)
v1_routes.use("/content_writing_response", contentWritinResponseRoutes)
v1_routes.use("/language_prep", languagePrepRoutes)
v1_routes.use("/quiz", quizRoutes)

// agnet
v1_routes.use("/agent", agentRoutes)
v1_routes.use("/job_post", jobPostRoutes)



// student
v1_routes.use("/student", studentRoutes)



export default v1_routes