import express from 'express';
import {
  getAllCustomer,
  getCustomerById,
  getCountCustomer,
  getCustomerByAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customer.service.js';
const router = express.Router();

router.route('/').get(getAllCustomer).post(createCustomer);

router.route('/count_customer').get(getCountCustomer);

router.route('/customer_by_address').get(getCustomerByAddress);

router
  .route('/:id')
  .get(getCustomerById)
  .put(updateCustomer)
  .delete(deleteCustomer);

// router.get('/', getAllCustomer);
// router.get('/count_customer', getCountCustomer);
// router.get('/customer_by_address', getCustomerByAddress);
// router.post('/', createCustomer);
// router.put('/:id', updateCustomer);
// router.delete('/:id', deleteCustomer);

export default router;
