import express from 'express';
import {
  getAllCustomer,
  getCountCustomer,
  getCustomerByAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../services/customer.service.js';
const router = express.Router();

router.get('/', getAllCustomer);
router.get('/count_customer', getCountCustomer);
router.get('/customer_by_address', getCustomerByAddress);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

export default router;
