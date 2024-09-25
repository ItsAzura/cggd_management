import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';
import bcrypt from 'bcryptjs';
import {
  MAX_ITEMS_PAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  SALT,
} from '../lib/constants.js';

const getAllCustomer = asyncHandler(async (req, res) => {
  const {
    customer_name,
    email,
    phone,
    address,
    page,
    sort_by = DEFAULT_SORT_BY,
    sort_order = DEFAULT_SORT_ORDER,
  } = req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = MAX_ITEMS_PAGE;
  const offset = (page - 1) * limit;

  let query = `
    SELECT * FROM customers WHERE 1=1 `;

  let countQuery = `
    SELECT COUNT(*) as total_customer FROM customers WHERE 1=1`;

  const values = [];

  if (customer_name) {
    query += ' AND customer_name LIKE ?';
    countQuery += ' AND customer_name LIKE ?';
    values.push(`%${customer_name}%`);
  }

  if (email) {
    query += ' AND email LIKE ?';
    countQuery += ' AND email LIKE ?';
    values.push(`%${email}%`);
  }

  if (phone) {
    query += ' AND phone LIKE ?';
    countQuery += ' AND phone LIKE ?';
    values.push(`%${phone}%`);
  }

  if (address) {
    query += ' AND address LIKE ?';
    countQuery += ' AND address LIKE ?';
    values.push(`%${address}%`);
  }

  query += ` ORDER BY ${sort_by} ${sort_order.toUpperCase()}`;

  query += ' LIMIT ? OFFSET ?';
  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_customer;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);

    res.json({
      page: parseInt(page, MAX_ITEMS_PAGE),
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

const getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = 'SELECT * FROM customers WHERE id = ?';

  const [rows] = await db.query(query, [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  res.json(rows[0]);
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
  const { customer_name, email, phone, password, address } = req.body;

  const existingCustomer = await db.query(
    'SELECT * FROM customers WHERE email = ? or phone = ?',
    [email, phone]
  );

  if (existingCustomer[0].length) {
    return res.status(400).json({ message: 'Customer already exists' });
  }

  const salt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(password, salt);

  const query =
    'INSERT INTO customers (customer_name, email, phone, password,address) VALUES (?, ?, ?, ?,?)';

  const [result] = await db.query(query, [
    customer_name,
    email,
    phone,
    hashedPassword,
    address,
  ]);
  res.status(201).json({
    message: 'Customer created',
    id: result.insertId,
    customer_name,
    email,
    password: hashedPassword,
    phone,
    address,
  });
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { id, customer_name, email, phone, password, address } = req.body;

  if (!customer_name || !email || !phone || !password || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingCustomer] = await db.query(
      'SELECT * FROM customers WHERE id = ?',
      [id]
    );

    if (existingCustomer.length === 0) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const salt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updateCustomer = {
      customer_name,
      email,
      phone,
      password: hashedPassword,
      address,
    };

    const [result] = await db.query('UPDATE customers SET ? WHERE id = ?', [
      updateCustomer,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: 'Failed to update customer' });
    }

    const [updatedCustomer] = await db.query(
      'SELECT * FROM customers WHERE id = ?',
      [id]
    );

    res.status(200).json(updatedCustomer[0]);
  } catch (error) {
    console.error('Failed to update customer:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exitingCustomer = await db.query(
    'SELECT * FROM customers WHERE id = ?',
    [id]
  );

  if (exitingCustomer[0].length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const query = 'DELETE FROM customers WHERE id = ?';

  await db.query(query, [id]);
  res.json({ message: 'Customer deleted' });
});

export {
  getAllCustomer,
  getCustomerById,
  getCountCustomer,
  getCustomerByAddress,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
