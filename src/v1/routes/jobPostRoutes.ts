import express from 'express';
import JobPostController from '../controller/JobPostController';
import { validateAgent, validateGeneral } from '../../middleware/authMiddleware';

const jobPostRoutes = express.Router();

// to check the agent can job post or not
jobPostRoutes.route('/can_post').get(validateAgent, JobPostController.canJobPost);

// agent related routes
jobPostRoutes.route('/create').post(validateAgent, JobPostController.createJobPost);
jobPostRoutes.route('/delete').post(validateAgent, JobPostController.deleteJobPost);
jobPostRoutes.route('/update').post(validateAgent, JobPostController.updateJobPost);
jobPostRoutes.route('/change_status').post(validateAgent, JobPostController.changeStatus);
jobPostRoutes.route('/created_list/:status').get(validateAgent, JobPostController.getAgentJobPosts);
jobPostRoutes.route('/applicants').post(validateAgent, JobPostController.applicants);

// user related routes
jobPostRoutes.route('/filter').post(JobPostController.filterJobPosts);
jobPostRoutes.route('/details').post(JobPostController.detailJobPost);
jobPostRoutes.route('/is_applied').post(validateGeneral, JobPostController.isApplied);
jobPostRoutes.route('/apply').post(validateGeneral, JobPostController.apply);
jobPostRoutes.route('/history').post(validateGeneral, JobPostController.historyJobPost);


export default jobPostRoutes;
