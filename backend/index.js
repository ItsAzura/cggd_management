import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import orderController from './controllers/order.controller.js';
import customerController from './controllers/customer.controller.js';
import productController from './controllers/product.controller.js';
import selectorController from './controllers/selector.controller.js';
import supplierController from './controllers/supplier.controller.js';
import inventoryController from './controllers/inventory.controller.js';
import userController from './controllers/user.controller.js';
import ReportController from './controllers/report.controller.js';
import multer from 'multer';
import cors from 'cors';

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

/// Cấu hình multer cho việc upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Thư mục lưu trữ file upload
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Tên file duy nhất
  },
});

const upload = multer({ storage: storage });

// Thiết lập rate limit
const limiter = rateLimit({
  windowMs: 1000,
  max: 30,
});

app.use(limiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

// Endpoint để upload ảnh
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Đường dẫn đầy đủ đến file đã upload
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${
    req.file.filename
  }`;

  res.json({ message: 'File uploaded successfully', imageUrl });
});

app.use('/api/orders', orderController);
app.use('/api/customers', customerController);
app.use('/api/products', productController);
app.use('/api/selectors', selectorController);
app.use('/api/suppliers', supplierController);
app.use('/api/inventory', inventoryController);
app.use('/api/users', userController);
app.use('/api/reports', ReportController);

app.use('/uploads', express.static('uploads'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
