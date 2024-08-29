import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllProductInventory = asyncHandler(async (req, res) => {
  const { product_id, quantity, min_quantity, location_id, page } = req.query;
  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      inventory.*, 
      products.name AS product_name, 
      inventory_location.name AS location_name
    FROM inventory
    JOIN products ON inventory.product_id = products.id
    JOIN inventory_location ON inventory.location_id = inventory_location.id
    WHERE 1=1`;

  let countQuery = `
    SELECT COUNT(*) as total_inventory 
    FROM inventory 
    JOIN products ON inventory.product_id = products.id
    JOIN inventory_location ON inventory.location_id = inventory_location.id
    WHERE 1=1`;

  const values = [];

  if (product_id) {
    query += ' AND product_id = ?';
    countQuery += ' AND product_id = ?';
    values.push(product_id);
  }

  if (quantity) {
    query += ' AND quantity = ?';
    countQuery += ' AND quantity = ?';
    values.push(quantity);
  }

  if (min_quantity) {
    query += ' AND min_quantity = ?';
    countQuery += ' AND min_quantity = ?';
    values.push(min_quantity);
  }

  if (location_id) {
    query += ' AND location_id = ?';
    countQuery += ' AND location_id = ?';
    values.push(location_id);
  }

  query += ' LIMIT ? OFFSET ?';

  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_inventory;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_inventory: total,
      total_pages: totalPages,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const createProductInventory = asyncHandler(async (req, res) => {
  const { product_id, quantity, min_quantity, location_id } = req.body;

  if (!product_id || !quantity || !min_quantity || !location_id) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const query =
    'INSERT INTO inventory (product_id, quantity, min_quantity, location_id) VALUES (?, ?, ?, ?)';

  const [result] = await db.query(query, [
    product_id,
    quantity,
    min_quantity,
    location_id,
  ]);
  res.status(201).json({
    id: result.insertId,
    product_id,
    quantity,
    min_quantity,
    location_id,
  });
});

const updateProductInventory = asyncHandler(async (req, res) => {
  const { product_id, quantity, min_quantity, location_id } = req.body;
  const { id } = req.params;

  if (!product_id || !quantity || !min_quantity || !location_id) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const query =
    'UPDATE inventory SET product_id = ?, quantity = ?, min_quantity = ?, location_id = ? WHERE id = ?';

  const [result] = await db.query(query, [
    product_id,
    quantity,
    min_quantity,
    location_id,
    id,
  ]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Product inventory not found');
  }

  res.json({
    id,
    product_id,
    quantity,
    min_quantity,
    location_id,
  });
});

const deleteProductInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM inventory WHERE id = ?';
  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Product inventory not found');
  }

  res.status(200).json({ message: 'Product removed' });
});

export {
  getAllProductInventory,
  createProductInventory,
  updateProductInventory,
  deleteProductInventory,
};
