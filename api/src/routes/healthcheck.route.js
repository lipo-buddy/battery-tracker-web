import { healthcheck } from '../controllers/healthcheck.controller';
import { catchAsync } from '@sea-machines/utils';
import { Router } from 'express';

const router = Router();

router.get('/healthcheck', catchAsync(healthcheck)); // GET /api/v1/healthcheck

export default router;
