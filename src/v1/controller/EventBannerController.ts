import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import EventBanner from "../../model/EventBanner"; // Ensure you have the EventBanner model
import { returnHelper } from "../../helpers/returnHelper";
import EventBannerImage from "../../model/EventBannerImage";
import path from "path";
import fs from "fs";
import { Op } from "sequelize";
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
                eventBannerImages.push({ eventBannerId: eventBanner.dataValues.uuid, imageUrl: name });
            }

            // Assuming you have an EventBannerImage model imported
            await EventBannerImage.bulkCreate(eventBannerImages);

            return returnHelper(res, 200, true, "Event Banner Created");

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async updateEventBanner(req: RequestWithUser, res: Response) {
        try {
            const { start_date, end_date, heading, descriptive_text, uuid } = req.body;

            // Validate required fields
            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide UUID");
            }

            const images = req.files;

            const eventBanner = await EventBanner.findOne({ where: { uuid: uuid } });

            if (!eventBanner) {
                return returnHelper(res, 200, false, "Event Banner not found");
            }

            // Update the event banner
            await EventBanner.update(
                Object.fromEntries(Object.entries({ start_date, end_date, heading, descriptive_text }).filter(([_, v]) => v != null)),
                { where: { uuid: uuid } }
            );

            if (images && Array.isArray(images) && images.length > 0) {
                const eventBannerImages = [];
                for (const image of Object.values(images)) {
                    const timestamp = new Date().toISOString(); // Get the current timestamp
                    const buffer = image.buffer; // Get the buffer from the image
                    const name = `${timestamp}_${image.originalname}`; // Add timestamp to the original name of the image
                    fs.writeFileSync(
                        path.join("public/event_images", name),
                        buffer
                    );
                    eventBannerImages.push({ eventBannerId: eventBanner.dataValues.uuid, imageUrl: name });
                }

                // Assuming you have an EventBannerImage model imported
                await EventBannerImage.bulkCreate(eventBannerImages);
            }

            return returnHelper(res, 200, true, "Event Banner Updated");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async getEventBannerById(req: RequestWithUser, res: Response) {
        try {
            const { id } = req.params; // Get the id from the request parameters

            // Validate the id
            if (!id) {
                return returnHelper(res, 200, false, "Event Banner ID is required");
            }

            const eventBanner = await EventBanner.findOne({
                where: { uuid: id },
                attributes: ["uuid", "start_date", "end_date", "heading", "descriptive_text"],
                include: [{ model: EventBannerImage, as: 'images', attributes: ["uuid", "imageUrl", "url"] }]
            });

            if (!eventBanner) {
                return returnHelper(res, 200, false, "Event Banner not found");
            }

            return returnHelper(res, 200, true, "Event Banner Found", eventBanner);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    async deleteEventBannerImage(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.params; // Get the uuid from the request parameters

            // Validate the uuid
            if (!uuid) {
                return returnHelper(res, 200, false, "Event Banner Image UUID is required");
            }
            const imageRecord = await EventBannerImage.findOne({ where: { uuid } });

            if (!imageRecord) {
                return returnHelper(res, 200, false, "Event Banner Image not found");
            }

            const deletedImage = await EventBannerImage.destroy({
                where: { uuid }
            });

            if (!deletedImage) {
                return returnHelper(res, 200, false, "Event Banner Image not found");
            }



            if (imageRecord.dataValues.imageUrl && imageRecord.dataValues.imageUrl !== "") {

                if (fs.existsSync(`./public/event_images/${imageRecord.dataValues.imageUrl}`)) {
                    fs.unlink("./public/event_images/" + imageRecord.dataValues.imageUrl, (err) => {
                        if (err) {
                            console.error("Some issue in deleting file", err);
                        }
                    });
                }
            }

            return returnHelper(res, 200, true, "Event Banner Image deleted successfully");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }


    async deleteEventBanner(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.params; // Get the uuid from the request parameters

            // Validate the uuid
            if (!uuid) {
                return returnHelper(res, 400, false, "Event Banner UUID is required");
            }

            const eventBanner = await EventBanner.findOne({ where: { uuid } });

            if (!eventBanner) {
                return returnHelper(res, 404, false, "Event Banner not found");
            }

            const deletedBanner = await EventBanner.destroy({
                where: { uuid }
            });

            if (!deletedBanner) {
                return returnHelper(res, 404, false, "Event Banner not found");
            }

            const findImages = await EventBannerImage.findAll({ where: { eventBannerId: uuid } });
            if (findImages && findImages.length > 0) {
                await EventBannerImage.destroy({
                    where: { eventBannerId: uuid }
                });

                await Promise.all(findImages.map(async (image) => {
                    if (image.dataValues.imageUrl && image.dataValues.imageUrl !== "") {
                        if (fs.existsSync(`./public/event_images/${image.dataValues.imageUrl}`)) {
                            fs.unlink("./public/event_images/" + image.dataValues.imageUrl, (err) => { });
                        }
                    }
                }));
            }

            return returnHelper(res, 200, true, "Event Banner deleted successfully");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }


    async listEventBanners(req: RequestWithUser, res: Response) {
        try {
            const { flag } = req.query; // Get the flag from the request query
            const today = new Date();

            const condition = flag === 'past' 
                ? { end_date: { [Op.lt]: today } } // Filter for past event banners
                : flag === 'current' 
                ? { end_date: { [Op.gt]: today } } // Filter for future event banners
                : {}; // No filter if flag is not recognized

            const eventBanners = await EventBanner.findAll({
                where: condition,
                attributes: ["uuid", "start_date", "end_date", "heading", "descriptive_text", "createdAt"],
                include: [{ model: EventBannerImage, as: 'images', attributes: ["uuid", "imageUrl", "url"] }]
            });
            return returnHelper(res, 200, true, "Event Banners Found", eventBanners);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }
}

export default new EventBannerController(); 