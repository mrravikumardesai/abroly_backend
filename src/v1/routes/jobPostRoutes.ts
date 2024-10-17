import express from 'express';
import JobPostController from '../controller/JobPostController';

const jobPostRoutes = express.Router();

jobPostRoutes.post('/create', JobPostController.createJobPost);
jobPostRoutes.get('/filter', JobPostController.filterJobPosts);
jobPostRoutes.get('/agent/:agentId', JobPostController.getAgentJobPosts);



export default jobPostRoutes;
