import express from 'express';
import {
  getAllProduct,
  getCountProduct,
  getTopOrderProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/product.service.js';
const router = express.Router();
import multer from 'multer';

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Save uploaded images to the /uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Save the file with a unique name
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), createProduct);

router.route('/').get(getAllProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.route('/count_product').get(getCountProduct);

router.route('/top_order_product').get(getTopOrderProduct);

// router.get('/', getAllProduct);
// router.get('/count_product', getCountProduct);
// router.get('/top_order_product', getTopOrderProduct);
// router.post('/', createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

export default router;
