import express from 'express';
import {
  getAllCategory,
  getAllSize,
  getAllColor,
  getAllInvertoryLocation,
  getAllSuppliers,
  getAllRoles,
  getAllInventoryProduct,
} from '../services/selector.service.js';
const router = express.Router();

router.route('/colors').get(getAllColor);

router.route('/sizes').get(getAllSize);

router.route('/categories').get(getAllCategory);

router.route('/locations').get(getAllInvertoryLocation);

router.route('/suppliers').get(getAllSuppliers);

router.route('/roles').get(getAllRoles);

router.route('/products').get(getAllInventoryProduct);

// router.get('/colors', getAllColor);
// router.get('/sizes', getAllSize);
// router.get('/categories', getAllCategory);
// router.get('/locations', getAllInvertoryLocation);

export default router;
