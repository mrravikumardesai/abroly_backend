import express from 'express';
import { validateAdmin } from '../../middleware/authMiddleware';
import SubscriptionController from '../controller/SubscriptionController';

const subscriptionRoutes = express.Router();

subscriptionRoutes.route("/add").post(validateAdmin, SubscriptionController.addSubscription);
subscriptionRoutes.route("/custom_assign").post(validateAdmin, SubscriptionController.assignCustomSubscription);

// add on
subscriptionRoutes.route("/custom_add_on").post(validateAdmin, SubscriptionController.customAddOn);
subscriptionRoutes.route("/list_add_on").post(validateAdmin, SubscriptionController.listAddOnes);

subscriptionRoutes.route("/update").post(validateAdmin, SubscriptionController.updateSubscription);
subscriptionRoutes.route("/delete").post(validateAdmin, SubscriptionController.deleteSubscription);
subscriptionRoutes.route("/list").get(validateAdmin, SubscriptionController.listSubscriptions);

// subscriptionRoutes.route("/:uuid").get(validateAdmin, SubscriptionController.getSubscriptionByUUID);
subscriptionRoutes.route("/agent/:agent_uuid").get(validateAdmin, SubscriptionController.getSubscriptionsByAgentUUID);

export default subscriptionRoutes;
