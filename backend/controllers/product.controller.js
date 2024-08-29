import express from 'express';
import {
  getAllProduct,
  getCountProduct,
  getTopOrderProduct,
} from '../services/product.service.js';
const router = express.Router();

router.get('/', getAllProduct);
router.get('/count_product', getCountProduct);
router.get('/top_order_product', getTopOrderProduct);

export default router;
