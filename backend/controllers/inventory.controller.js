import express from 'express';
import {
  getAllProductInventory,
  getProductInventoryById,
  createProductInventory,
  updateProductInventory,
  deleteProductInventory,
  createProductsIncoming,
  createProductsExport,
  updateProductsLog,
  deleteProductsIncomingExport,
  refuseProductsIncomingExport,
  acceptProductsIncoming,
  acceptProductsExport,
  getAllProductInventoryIncoming,
  getAllProductInventoryExport,
  getAllHistoryProductInventoryIncoming,
  getAllHistoryProductInventoryExport,
  getProductInventoryIncomingById,
  getProductInventoryExportById,
} from '../services/inventory.service.js';
const router = express.Router();

router.route('/').get(getAllProductInventory).post(createProductInventory);

router
  .route('/incoming')
  .get(getAllProductInventoryIncoming)
  .post(createProductsIncoming);

router
  .route('/export')
  .get(getAllProductInventoryExport)
  .post(createProductsExport);

router.route('/history_incoming').get(getAllHistoryProductInventoryIncoming);

router.route('/history_export').get(getAllHistoryProductInventoryExport);

router
  .route('/:id')
  .get(getProductInventoryById)
  .put(updateProductInventory)
  .delete(deleteProductInventory);

router.route('/log_update/:id').put(updateProductsLog);

router.route('/incoming/:id').get(getProductInventoryIncomingById);

router.route('/export/:id').get(getProductInventoryExportById);

router
  .route('/log/:id')
  .put(refuseProductsIncomingExport)
  .delete(deleteProductsIncomingExport);

router.route('/accept_incoming/:id').put(acceptProductsIncoming);

router.route('/accept_export/:id').put(acceptProductsExport);

// router.get('/', getAllProductInventory);
// router.post('/', createProductInventory);
// router.put('/:id', updateProductInventory);
// router.delete('/:id', deleteProductInventory);
// router.post('/incoming', createProductsIncoming);
// router.put('/incoming/:id', updateProductsLog);
// router.post('/export', createProductsExport);
// router.delete('/log/:id', deleteProductsIncomingExport);
// router.put('/log/:id', refuseProductsIncomingExport);
// router.put('/incoming/:id', acceptProductsIncoming);
// router.put('/export/:id', acceptProductsExport);

export default router;
