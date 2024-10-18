import { Response } from "express";
import { RequestWithUser } from "../../utils/types";

class PackagesController {

    async createPackage(req: RequestWithUser, res: Response) {
        const {
            name,
            description,
            category,
            leadLimit,
            teamLimit,
            jobPostLimit,
            tourPostLimit,
            travelLeadLimit,
            profilePinning,
            eventBanner,
            price,
        } = req.body;

        try {
            const newPackage = await Package.create({
                name,
                description,
                category,
                leadLimit,
                teamLimit,
                jobPostLimit,
                tourPostLimit,
                travelLeadLimit,
                profilePinning,
                eventBanner,
                price,
            });
            res.status(201).json({ package: newPackage });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create package', details: error.message });
        }
    }
}

export default new PackagesController()