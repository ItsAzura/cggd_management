import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllCustomer = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM customers');
  res.json(rows);
});

const getCountCustomer = asyncHandler(async (req, res) => {
  const count_customer = 'SELECT COUNT(*) AS total_customer FROM customers;';

  const [rows] = await db.query(count_customer);
  res.json(rows);
});

const getCustomerByAddress = asyncHandler(async (req, res) => {
  const query = `
    SELECT 
    address, 
    COUNT(*) AS customer_count
FROM 
    customers
GROUP BY 
    address;
    `;

  const [rows] = await db.query(query);
  res.json(rows);
});

export { getAllCustomer, getCountCustomer, getCustomerByAddress };
