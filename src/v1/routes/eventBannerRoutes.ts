import { Router } from "express";
import EventBannerController from "../controller/EventBannerController";
import { validateAdmin } from "../../middleware/authMiddleware";
import { uploadMedia } from "../../middleware/fileUpload";

const eventBannerRoutes = Router();

// Admin only route to create event banner
eventBannerRoutes.post("/public-create", validateAdmin,uploadMedia.any(), EventBannerController.createEventBanner);
// Note: Ensure multer is used for handling file uploads in the controller

// Route to list event banners (accessible to agents)
eventBannerRoutes.get("/", EventBannerController.listEventBanners);

export default eventBannerRoutes; 