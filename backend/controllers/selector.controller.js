import express from 'express';
import {
  getAllCategory,
  getAllSize,
  getAllColor,
  getAllInvertoryLocation,
} from '../services/selector.service.js';
const router = express.Router();

router.get('/colors', getAllColor);
router.get('/sizes', getAllSize);
router.get('/categories', getAllCategory);
router.get('/locations', getAllInvertoryLocation);

export default router;
