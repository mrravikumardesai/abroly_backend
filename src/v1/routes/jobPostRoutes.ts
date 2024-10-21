import express from 'express';
import JobPostController from '../controller/JobPostController';
import { validateAgent, validateGeneral } from '../../middleware/authMiddleware';

const jobPostRoutes = express.Router();

jobPostRoutes.route('/create').post(validateAgent, JobPostController.createJobPost);
jobPostRoutes.route('/delete').post(validateAgent, JobPostController.deleteJobPost);
jobPostRoutes.route('/update').post(validateAgent, JobPostController.updateJobPost);
jobPostRoutes.route('/filter').post(JobPostController.filterJobPosts);
jobPostRoutes.route('/details').post(JobPostController.detailJobPost);
jobPostRoutes.route('/is_applied').post(validateGeneral,JobPostController.isApplied);
jobPostRoutes.route('/apply').post(validateGeneral,JobPostController.apply);
jobPostRoutes.route('/applicants').post(validateAgent, JobPostController.applicants);
jobPostRoutes.route('/change_status').post(validateAgent, JobPostController.changeStatus);
jobPostRoutes.route('/history').post(validateGeneral, JobPostController.historyJobPost);
jobPostRoutes.route('/created_list').get(validateAgent, JobPostController.getAgentJobPosts);


export default jobPostRoutes;
