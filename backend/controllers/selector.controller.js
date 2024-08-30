import express from 'express';
import {
  getAllCategory,
  getAllSize,
  getAllColor,
  getAllInvertoryLocation,
} from '../services/selector.service.js';
const router = express.Router();

router.route('/colors').get(getAllColor);

router.route('/sizes').get(getAllSize);

router.route('/categories').get(getAllCategory);

router.route('/locations').get(getAllInvertoryLocation);

// router.get('/colors', getAllColor);
// router.get('/sizes', getAllSize);
// router.get('/categories', getAllCategory);
// router.get('/locations', getAllInvertoryLocation);

export default router;
