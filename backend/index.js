import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import orderController from './controllers/order.controller.js';
import customerController from './controllers/customer.controller.js';
import productController from './controllers/product.controller.js';
import selectorController from './controllers/selector.controller.js';
import supplierController from './controllers/supplier.controller.js';
import inventoryController from './controllers/inventory.controller.js';

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/orders', orderController);
app.use('/api/customers', customerController);
app.use('/api/products', productController);
app.use('/api/selectors', selectorController);
app.use('/api/suppliers', supplierController);
app.use('/api/inventory', inventoryController);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
