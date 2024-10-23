import { Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import Package from "../../model/Packages";
import { validateAddPackage, validateUpdatePackage } from "../validations/packageValidators";

class PackageController {
    // Create Package
    async addPackage(req: RequestWithUser, res: Response) {
        try {
            // const { error } = validateAddPackage(req.body);
            // if (error) {
            //     return returnHelper(res, 201, false, error.details[0].message);
            // }

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

            const packageData = await Package.create({
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

            return returnHelper(res, 201, true, "Package Created Successfully", packageData);
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message);
        }
    }

    // Update Package
    async updatePackage(req: RequestWithUser, res: Response) {
        try {
            const { error } = validateUpdatePackage(req.body);
            if (error) {
                return returnHelper(res, 400, false, error.details[0].message);
            }

            const { uuid, ...updateFields } = req.body;

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
                return returnHelper(res, 400, false, "Provide Required Params");
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
                attributes: ["uuid", "name", "description", "category", "price","leadLimit", "createdAt"],
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
