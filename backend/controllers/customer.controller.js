import express from 'express';
import {
  getAllCustomer,
  getCountCustomer,
  getCustomerByAddress,
} from '../services/customer.service.js';
const router = express.Router();

router.get('/', getAllCustomer);
router.get('/count_customer', getCountCustomer);
router.get('/customer_by_address', getCustomerByAddress);

export default router;
