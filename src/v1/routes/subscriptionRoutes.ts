import express from 'express';
import { validateAdmin } from '../../middleware/authMiddleware';
import SubscriptionController from '../controller/SubscriptionController';

const subscriptionRoutes = express.Router();

subscriptionRoutes.route("/add").post(validateAdmin, SubscriptionController.addSubscription);
subscriptionRoutes.route("/update").post(validateAdmin, SubscriptionController.updateSubscription);

export default subscriptionRoutes;
