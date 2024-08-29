import express from 'express';
import {
  getAllSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from '../services/supplier.service.js';
const router = express.Router();

router.get('/', getAllSupplier);
router.post('/', createSupplier);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
