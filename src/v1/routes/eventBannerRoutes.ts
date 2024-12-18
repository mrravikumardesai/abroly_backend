import { Router } from "express";
import EventBannerController from "../controller/EventBannerController";
import { validateAdmin } from "../../middleware/authMiddleware";
import { uploadMedia } from "../../middleware/fileUpload";

const eventBannerRoutes = Router();

// Admin only route to create event banner
eventBannerRoutes.post("/public-create", validateAdmin,uploadMedia.any(), EventBannerController.createEventBanner);
eventBannerRoutes.post("/public-update", validateAdmin,uploadMedia.any(), EventBannerController.updateEventBanner);
eventBannerRoutes.post("/public-delete-event/:uuid", validateAdmin,EventBannerController.deleteEventBanner);
eventBannerRoutes.get("/public-get/:id", validateAdmin,EventBannerController.getEventBannerById);
eventBannerRoutes.post("/public-delete/:uuid", validateAdmin,EventBannerController.deleteEventBannerImage);
eventBannerRoutes.get("/public-list", validateAdmin,EventBannerController.listEventBanners);
eventBannerRoutes.post("/public-response",EventBannerController.createEventBannerResponse);
eventBannerRoutes.get("/public-response-list/:event_id",validateAdmin, EventBannerController.listEventBannerResponses);
eventBannerRoutes.get("/public-active-events", EventBannerController.getActiveEvents);
const eventBannersAgentRoutes = Router();

eventBannerRoutes.use("/agent", eventBannersAgentRoutes);
export default eventBannerRoutes; 