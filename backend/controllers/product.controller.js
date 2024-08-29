import express from 'express';
import {
  getAllProduct,
  getCountProduct,
  getTopOrderProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service.js';
const router = express.Router();

router.get('/', getAllProduct);
router.get('/count_product', getCountProduct);
router.get('/top_order_product', getTopOrderProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
