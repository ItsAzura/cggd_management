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
import { DEFAULT_WINDOW_MS, DEFAULT_MAX } from './lib/constants.js';

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

// Thiết lập rate limit
const limiter = rateLimit({
  windowMs: DEFAULT_WINDOW_MS,
  max: DEFAULT_MAX,
});

app.use(limiter);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

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
