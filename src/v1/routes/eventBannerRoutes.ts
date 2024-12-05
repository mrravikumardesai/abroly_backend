import { Router } from "express";
import EventBannerController from "../controller/EventBannerController";
import { validateAdmin } from "../../middleware/authMiddleware";
import { uploadMedia } from "../../middleware/fileUpload";

const eventBannerRoutes = Router();

// Admin only route to create event banner
eventBannerRoutes.post("/public-create", validateAdmin,uploadMedia.any(), EventBannerController.createEventBanner);
eventBannerRoutes.get("/public-get/:id", validateAdmin,EventBannerController.getEventBannerById);

eventBannerRoutes.get("/", EventBannerController.listEventBanners);

export default eventBannerRoutes; 