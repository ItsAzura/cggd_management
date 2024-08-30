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

router.route('/').get(getAllProduct).post(createProduct);

router.route('/:id').put(updateProduct).delete(deleteProduct);

router.route('/count_product').get(getCountProduct);

router.route('/top_order_product').get(getTopOrderProduct);

// router.get('/', getAllProduct);
// router.get('/count_product', getCountProduct);
// router.get('/top_order_product', getTopOrderProduct);
// router.post('/', createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

export default router;
