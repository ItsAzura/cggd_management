import express from 'express';
import {
  getAllReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
} from '../services/report.service.js';
const router = express.Router();

router.route('/').get(getAllReports).post(createReport);

router.route('/:id').get(getReportById).put(updateReport).delete(deleteReport);

export default router;
