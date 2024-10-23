import express from 'express';
import { validateAdmin } from '../../middleware/authMiddleware';
import PackageController from '../controller/PackageController';


const packageRoutes = express.Router();

packageRoutes.route("/add").post(validateAdmin, PackageController.addPackage);
packageRoutes.route("/update").post(validateAdmin, PackageController.updatePackage);
packageRoutes.route("/delete").post(validateAdmin, PackageController.deletePackage);
packageRoutes.route("/list").get(PackageController.listPackages);
packageRoutes.route("/details").post(PackageController.detailsPackage);

export default packageRoutes;
