import { Router } from 'express';
import { CompanyController } from '../controller/company.controller';

const router = Router();
const controller = new CompanyController();

// Company routes
router.get('/', controller.getCompanies.bind(controller));
router.get('/:slug', controller.getCompanyBySlug.bind(controller));
router.get('/:companyId/roles', controller.getRoles.bind(controller));
router.get('/:companyId/questions', controller.getQuestions.bind(controller));

// Interview routes
router.post('/interview/start', controller.startInterview.bind(controller));
router.get('/interview/:id', controller.getInterviewStatus.bind(controller));

export default router;
