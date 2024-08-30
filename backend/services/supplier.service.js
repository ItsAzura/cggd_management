import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllSupplier = asyncHandler(async (req, res) => {
  const { supplier_name, contact_person, phone, email, address, page } =
    req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = 'SELECT * FROM suppliers WHERE 1=1';
  let countQuery =
    'SELECT COUNT(*) as total_suppliers FROM suppliers WHERE 1=1';
  const values = [];

  if (supplier_name) {
    query += ' AND supplier_name LIKE ?';
    countQuery += ' AND supplier_name LIKE ?';
    values.push(`%${supplier_name}%`);
  }

  if (contact_person) {
    query += ' AND contact_person LIKE ?';
    countQuery += ' AND contact_person LIKE ?';
    values.push(`%${contact_person}%`);
  }

  if (phone) {
    query += ' AND phone LIKE ?';
    countQuery += ' AND phone LIKE ?';
    values.push(`%${phone}%`);
  }

  if (email) {
    query += ' AND email LIKE ?';
    countQuery += ' AND email LIKE ?';
    values.push(`%${email}%`);
  }

  if (address) {
    query += ' AND address LIKE ?';
    countQuery += ' AND address LIKE ?';
    values.push(`%${address}%`);
  }

  query += ' LIMIT ? OFFSET ?';
  try {
    const [suppliers] = await db.query(query, [...values, limit, offset]);
    const [count] = await db.query(countQuery, values);
    const totalSuppliers = count[0].total_suppliers;
    const totalPages = Math.ceil(totalSuppliers / limit);

    res.status(200).json({
      page: parseInt(page, 10),
      per_page: limit,
      total_products: totalSuppliers,
      total_pages: totalPages,
      data: suppliers,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const createSupplier = asyncHandler(async (req, res) => {
  const { supplier_name, contact_person, phone, email, address } = req.body;

  if (!supplier_name || !contact_person || !phone || !email || !address) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const existingSupplier = await db.query(
    'SELECT * FROM suppliers WHERE email = ? AND phone = ? ',
    [email, phone]
  );

  if (existingSupplier.length > 0) {
    res.status(400).json({ message: 'Supplier already exists' });
  }

  const query =
    'INSERT INTO suppliers (supplier_name, contact_person, phone, email, address) VALUES (?, ?, ?, ?, ?)';

  const [result] = await db.query(query, [
    supplier_name,
    contact_person,
    phone,
    email,
    address,
  ]);

  res.status(201).json({
    id: result.insertId,
    supplier_name,
    contact_person,
    phone,
    email,
    address,
  });
});

const updateSupplier = asyncHandler(async (req, res) => {
  const { supplier_name, contact_person, phone, email, address } = req.body;
  const { id } = req.params;

  if (!supplier_name || !contact_person || !phone || !email || !address) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const existingSupplier = await db.query(
    'SELECT * FROM suppliers WHERE email = ? AND phone = ? ',
    [email, phone]
  );

  if (existingSupplier.length > 0) {
    res.status(400).json({ message: 'Supplier already exists' });
  }

  const query =
    'UPDATE suppliers SET supplier_name = ?, contact_person = ?, phone = ?, email = ?, address = ? WHERE id = ?';

  await db.query(query, [
    supplier_name,
    contact_person,
    phone,
    email,
    address,
    id,
  ]);

  res.status(200).json({
    id,
    supplier_name,
    contact_person,
    phone,
    email,
    address,
  });
});

const deleteSupplier = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exitingUser = await db.query('SELECT * FROM suppliers WHERE id = ?', [
    id,
  ]);

  if (exitingUser.length === 0) {
    res.status(404).json({ message: 'Supplier not found' });
  }

  const query = 'DELETE FROM suppliers WHERE id = ?';
  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Supplier not found');
  }

  res.status(200).json({ message: 'Supplier deleted' });
});

export { getAllSupplier, createSupplier, updateSupplier, deleteSupplier };
