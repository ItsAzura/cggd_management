import express from 'express';
import {
  getAllOrder,
  getTotalAmount,
  getCountOrder,
  getTotalAmountEveryMonth,
  getCountCategory,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../services/order.service.js';
const router = express.Router();

router.route('/').get(getAllOrder).post(createOrder);

router.route('/:id').put(updateOrder).delete(deleteOrder);

router.route('/total_amount').get(getTotalAmount);

router.route('/count_order').get(getCountOrder);

router.route('/total_amount_every_month').get(getTotalAmountEveryMonth);

router.route('/count_category').get(getCountCategory);

// router.get('/', getAllOrder);
// router.get('/total_amount', getTotalAmount);
// router.get('/count_order', getCountOrder);
// router.get('/total_amount_every_month', getTotalAmountEveryMonth);
// router.get('/count_category', getCountCategory);
// router.post('/', createOrder);
// router.put('/:id', updateOrder);
// router.delete('/:id', deleteOrder);

export default router;
