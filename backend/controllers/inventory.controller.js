import express from 'express';
import {
  getAllProductInventory,
  createProductInventory,
  updateProductInventory,
  deleteProductInventory,
} from '../services/inventory.service.js';
const router = express.Router();

router.get('/', getAllProductInventory);
router.post('/', createProductInventory);
router.put('/:id', updateProductInventory);
router.delete('/:id', deleteProductInventory);

export default router;
