import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import Package from "../../model/Packages";
import { validateAddPackage, validateUpdatePackage } from "../validations/packageValidators";

class PackageController {
    // Create Package
    async addPackage(req: RequestWithUser, res: Response) {
        try {

            const {
                name,
                description,
                category,
                leadLimit,
                teamLimit,
                jobPostLimit,
                job_post_days,
                price,
                achievement_banner
            } = req.body;

            if (!name ||
                !description) {
                return returnHelper(res, 200, false, "Please Provide Required Fields")
            }

            await Package.create({
                name,
                description,
                category,
                leadLimit,
                teamLimit,
                jobPostLimit,
                job_post_days,
                price,
                achievement_banner
            });

            return returnHelper(res, 200, true, "Package Created Successfully");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    // Update Package
    async updatePackage(req: RequestWithUser, res: Response) {
        try {
            const { uuid, ...updateFields } = req.body
            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            await Package.update(updateFields, {
                where: {
                    uuid,
                },
            });

            return returnHelper(res, 200, true, "Package Updated Successfully");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    // Delete Package
    async deletePackage(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body;

            if (!uuid) {
                return returnHelper(res, 200, false, "Provide Required Params");
            }

            await Package.destroy({
                where: {
                    uuid,
                },
            });

            return returnHelper(res, 200, true, "Package Deleted Successfully");
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    // List Packages
    async listPackages(req: RequestWithUser, res: Response) {
        try {

            const packages = await Package.findAll({
                attributes: ["uuid", "name", "description", "category", "price", "leadLimit", "teamLimit", "jobPostLimit", "job_post_days","achievement_banner", "createdAt"],
            });

            return res.status(200).json({
                success: true,
                message: "Packages Found",
                data: packages,
            });

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }
    async detailsPackage(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body
            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide required fields")
            }
            const packages = await Package.findOne({
                where: {
                    uuid
                },
                attributes: ["uuid", "name", "description", "category", "price", "leadLimit", "teamLimit", "jobPostLimit", "job_post_days", "achievement_banner","createdAt"],
            });

            return res.status(200).json({
                success: true,
                message: "Packages Found",
                data: packages,
            });
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }
}

export default new PackageController();
