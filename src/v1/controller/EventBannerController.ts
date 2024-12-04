import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import EventBanner from "../../model/EventBanner"; // Ensure you have the EventBanner model
import { returnHelper } from "../../helpers/returnHelper";
import EventBannerImage from "../../model/EventBannerImage";
import path from "path";
import fs from "fs";
class EventBannerController {

    async createEventBanner(req: RequestWithUser, res: Response) {
        try {
            const { start_date, end_date, heading, descriptive_text } = req.body;

            // Validate required fields
            if (!start_date || !end_date || !heading || !descriptive_text) {
                return returnHelper(res, 200, false, "All fields are required");
            }

            const images = req.files; // Get images from the request
            if (!images || images.length === 0) {
                return returnHelper(res, 200, false, "At least one image is required");
            }

            const eventBanner = await EventBanner.create({
                start_date,
                end_date,
                heading,
                descriptive_text,
            });

            const eventBannerImages = [];
            for (const image of Object.values(images)) {
                const timestamp = new Date().toISOString(); // Get the current timestamp
                const buffer = image.buffer; // Get the buffer from the image
                const name = `${timestamp}_${image.originalname}`; // Add timestamp to the original name of the image
                fs.writeFileSync(
                    path.join("public/event_images", name),
                    buffer
                );
                eventBannerImages.push({ eventBannerId: eventBanner.dataValues.uuid, imageUrl:name });
            }

            // Assuming you have an EventBannerImage model imported
            await EventBannerImage.bulkCreate(eventBannerImages);

            return returnHelper(res, 200, true, "Event Banner Created");

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async listEventBanners(req: RequestWithUser, res: Response) {
        try {
            const eventBanners = await EventBanner.findAll();
            return returnHelper(res, 200, true, "Event Banners Found", eventBanners);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }
}

export default new EventBannerController(); 