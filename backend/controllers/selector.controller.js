import express from 'express';
import {
  getAllCategory,
  getAllSize,
  getAllColor,
} from '../services/selector.service.js';
const router = express.Router();

router.get('/colors', getAllColor);
router.get('/sizes', getAllSize);
router.get('/categories', getAllCategory);

export default router;
