import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllCustomer = asyncHandler(async (req, res) => {
  const { customer_name, email, phone, address, page } = req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT * FROM customers WHERE 1=1`;

  let countQuery = `
    SELECT COUNT(*) as total_customer FROM customers WHERE 1=1`;

  const values = [];

  if (customer_name) {
    query += ' AND customer_name LIKE ?';
    countQuery += ' AND customer_name LIKE ?';
    values.push(`%${customer_name}%`);
  }

  if (email) {
    query += ' AND email = ?';
    countQuery += ' AND email = ?';
    values.push(email);
  }

  if (phone) {
    query += ' AND phone = ?';
    countQuery += ' AND phone = ?';
    values.push(phone);
  }

  if (address) {
    query += ' AND address = ?';
    countQuery += ' AND address = ?';
    values.push(address);
  }

  query += ' LIMIT ? OFFSET ?';
  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_customer;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_customer: total,
      total_pages: totalPages,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
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

const createCustomer = asyncHandler(async (req, res) => {
  const { customer_name, email, phone, address } = req.body;
  const query =
    'INSERT INTO customers (customer_name, email, phone, address) VALUES (?, ?, ?, ?)';

  const [result] = await db.query(query, [
    customer_name,
    email,
    phone,
    address,
  ]);
  res
    .status(201)
    .json({ id: result.insertId, customer_name, email, phone, address });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { customer_name, email, phone, address } = req.body;
  const query =
    'UPDATE customers SET customer_name = ?, email = ?, phone = ?, address = ? WHERE id = ?';

  await db.query(query, [customer_name, email, phone, address, id]);
  res.json({ id, customer_name, email, phone, address });
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM customers WHERE id = ?';

  await db.query(query, [id]);
  res.json({ message: 'Customer deleted' });
});

export {
  getAllCustomer,
  getCountCustomer,
  getCustomerByAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
