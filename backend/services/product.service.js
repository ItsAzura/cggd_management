import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllProduct = asyncHandler(async (req, res) => {
  const {
    name,
    color_id,
    price_min,
    price_max,
    size_id,
    category_id,
    supplier_id,
    page,
  } = req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 6;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      products.*, 
      colors.color_name, 
      sizes.size_name, 
      categories.cate_name, 
      suppliers.supplier_name 
    FROM products
    LEFT JOIN colors ON products.color_id = colors.id
    LEFT JOIN sizes ON products.size_id = sizes.id
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN suppliers ON products.supplier_id = suppliers.id
    WHERE 1=1`;

  let countQuery = `
    SELECT COUNT(*) as total_products 
    FROM products
    LEFT JOIN colors ON products.color_id = colors.id
    LEFT JOIN sizes ON products.size_id = sizes.id
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN suppliers ON products.supplier_id = suppliers.id
    WHERE 1=1`;

  const values = [];

  if (name) {
    query += ' AND name LIKE ?';
    countQuery += ' AND name LIKE ?';
    values.push(`%${name}%`);
  }

  if (color_id) {
    query += ' AND color_id = ?';
    countQuery += ' AND color_id = ?';
    values.push(color_id);
  }

  if (price_min) {
    query += ' AND price >= ?';
    countQuery += ' AND price >= ?';
    values.push(price_min);
  }

  if (price_max) {
    query += ' AND price <= ?';
    countQuery += ' AND price <= ?';
    values.push(price_max);
  }

  if (size_id) {
    query += ' AND size_id = ?';
    countQuery += ' AND size_id = ?';
    values.push(size_id);
  }

  if (category_id) {
    query += ' AND category_id = ?';
    countQuery += ' AND category_id = ?';
    values.push(category_id);
  }

  if (supplier_id) {
    query += ' AND supplier_id = ?';
    countQuery += ' AND supplier_id = ?';
    values.push(supplier_id);
  }

  query += ' LIMIT ? OFFSET ?';

  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_products;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);
    res.json({
      page: parseInt(page, 6),
      per_page: limit,
      total_products: total,
      total_pages: totalPages,
      data: rows,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getCountProduct = async (req, res) => {
  try {
    console.log('Running count product query...');
    const [rows] = await db.query(
      `SELECT COUNT(*) AS total_product FROM products`
    );
    console.log('Query result:', rows);
    res.status(200).json({ total_product: rows[0].total_product });
  } catch (error) {
    console.error('Error executing query:', error);
    res
      .status(500)
      .json({ message: 'Error fetching product count', error: error.message });
  }
};

const getTopOrderProduct = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT product_id, COUNT(*) AS total_ordered
      FROM orders
      GROUP BY product_id
      ORDER BY total_ordered DESC
      LIMIT 1;
    `);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'No top ordered product found' });
    }
    res.status(200).json({
      product_id: rows[0].product_id,
      total_ordered: rows[0].total_ordered,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching top ordered product',
      error: error.message,
    });
  }
};

const getProductById = asyncHandler(async (req, res) => {
  const [rows] = await db.query(
    `SELECT 
      products.*, 
      colors.color_name, 
      sizes.size_name, 
      categories.cate_name, 
      suppliers.supplier_name 
    FROM products
    LEFT JOIN colors ON products.color_id = colors.id
    LEFT JOIN sizes ON products.size_id = sizes.id
    LEFT JOIN categories ON products.category_id = categories.id
    LEFT JOIN suppliers ON products.supplier_id = suppliers.id
    WHERE products.id = ?`,
    [req.params.id]
  );

  if (rows.length === 0) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(rows[0]);
});

const createProduct = asyncHandler(async (req, res) => {
  console.log('Received data:', req.body);
  console.log('Received file:', req.file);
  const {
    name,
    sku,
    category_id,
    size_id,
    color_id,
    material,
    price,
    supplier_id,
    description,
  } = req.body;

  // Check if a file was uploaded
  let image = null;
  if (req.file && req.file.filename) {
    image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  // Perform validation
  if (
    !name ||
    !sku ||
    !category_id ||
    !size_id ||
    !color_id ||
    !material ||
    !price ||
    !supplier_id ||
    !description
  ) {
    return res.status(400).json({ message: 'All product fields are required' });
  }

  // Check if product SKU already exists
  const [existingProduct] = await db.query(
    'SELECT * FROM products WHERE sku = ?',
    [sku]
  );
  if (existingProduct.length > 0) {
    return res.status(400).json({ message: 'Product already exists' });
  }

  // Create new product
  const newProduct = {
    name,
    sku,
    category_id,
    size_id,
    color_id,
    material,
    price,
    supplier_id,
    image, // Save the image URL in the database
    description,
  };

  const [result] = await db.query('INSERT INTO products SET ?', newProduct);
  newProduct.id = result.insertId;

  res
    .status(200)
    .json({ message: 'Product created successfully', product: newProduct });
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    sku,
    category_id,
    size_id,
    color_id,
    material,
    price,
    supplier_id,
    image,
    description,
  } = req.body;

  const existingProduct = await db.query(
    'SELECT * FROM products WHERE sku = ?',
    [sku]
  );

  if (existingProduct[0].length > 0) {
    return res.status(400).json({ message: 'Product already exists' });
  }

  const updatedProduct = {
    name,
    sku,
    category_id,
    size_id,
    color_id,
    material,
    price,
    supplier_id,
    image,
    description,
  };

  const [result] = await db.query('UPDATE products SET ? WHERE id = ?', [
    updatedProduct,
    req.params.id,
  ]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const exitingProduct = await db.query('SELECT * FROM products WHERE id = ?', [
    id,
  ]);

  if (exitingProduct[0].length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.status(200).json({ message: 'Product removed' });
});

export {
  getCountProduct,
  getAllProduct,
  getTopOrderProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
