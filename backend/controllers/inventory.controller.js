import express from 'express';
import {
  getAllProductInventory,
  createProductInventory,
  updateProductInventory,
  deleteProductInventory,
  createProductsIncoming,
  createProductsExport,
  updateProductsLog,
  deleteProductsIncomingExport,
} from '../services/inventory.service.js';
const router = express.Router();

router.get('/', getAllProductInventory);
router.post('/', createProductInventory);
router.put('/:id', updateProductInventory);
router.delete('/:id', deleteProductInventory);
router.post('/incoming', createProductsIncoming);
router.put('/incoming/:id', updateProductsLog);
router.post('/export', createProductsExport);
router.delete('/log/:id', deleteProductsIncomingExport);

export default router;
