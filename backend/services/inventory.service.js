import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';
import {
  MAX_ITEMS_PAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} from '../lib/constants.js';

const getAllProductInventory = asyncHandler(async (req, res) => {
  const {
    product_id,
    quantity,
    min_quantity,
    location_id,
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
    query += ' AND quantity <= ?';
    countQuery += ' AND quantity <= ?';
    values.push(quantity);
  }

  if (min_quantity) {
    query += ' AND quantity >= ?';
    countQuery += ' AND quantity >= ?';
    values.push(min_quantity);
  }

  if (location_id) {
    query += ' AND location_id = ?';
    countQuery += ' AND location_id = ?';
    values.push(location_id);
  }

  query += ` ORDER BY ${sort_by} ${sort_order.toUpperCase()}`;

  query += ' LIMIT ? OFFSET ?';

  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_inventory;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);

    res.json({
      page: parseInt(page, MAX_ITEMS_PAGE),
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

const getProductInventoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const query = ` 
    SELECT 
      inventory.*, 
      products.name AS product_name, 
      inventory_location.name AS location_name
    FROM inventory
    JOIN products ON inventory.product_id = products.id
    JOIN inventory_location ON inventory.location_id = inventory_location.id
     WHERE inventory.id = ?
  `;

  const [rows] = await db.query(query, [id]);

  if (rows.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(rows[0]);
});

const createProductInventory = asyncHandler(async (req, res) => {
  const { product_id, quantity, min_quantity, location_id } = req.body;

  if (!product_id || !quantity || !min_quantity || !location_id) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const existingProductInventory = await db.query(
    'SELECT * FROM inventory WHERE product_id = ? AND location_id = ?',
    [product_id, location_id]
  );

  if (existingProductInventory[0].length > 0) {
    res
      .status(400)
      .json({ message: 'Product already exists in this location' });
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
  const { id, product_id, quantity, min_quantity, location_id } = req.body;

  if (!product_id || !quantity || !min_quantity || !location_id) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [existingProduct] = await db.query(
      `SELECT * FROM inventory WHERE id = ?`,
      [id]
    );
    if (existingProduct.length === 0) {
      return res
        .status(404)
        .json({ message: 'Product not found in this Inventory' });
    }

    const updatedProduct = {
      product_id,
      quantity,
      min_quantity,
      location_id,
    };

    const [result] = await db.query(`UPDATE inventory SET ? WHERE id = ?`, [
      updatedProduct,
      id,
    ]);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: 'Failed to updated ' });
    }

    const [updatedProductInventory] = await db.query(
      `SELECT * FROM inventory WHERE id = ?`,
      [id]
    );

    res.json(updatedProductInventory[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteProductInventory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exitingProduct = await db.query(
    'SELECT * FROM inventory WHERE id = ?',
    [id]
  );

  if (exitingProduct[0].length === 0) {
    return res.status(404).json({ message: 'Customer not found' });
  }

  const query = 'DELETE FROM inventory WHERE id = ?';
  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Product inventory not found');
  }

  res.status(200).json({ message: 'Product removed' });
});

const createProductsIncoming = asyncHandler(async (req, res) => {
  const { logItems, user_id } = req.body;

  if (!logItems || logItems.length === 0) {
    res.status(400);
    return res.status(400).json({ message: 'Products are required' });
  }

  const type_id = 1;
  const status_id = 1;

  try {
    const [inventoryLogsResult] = await db.query(
      `INSERT INTO inventory_logs (type_id,status_id, user_id) VALUES (?,?,?)`,
      [type_id, status_id, user_id]
    );

    const inventoryLogsId = inventoryLogsResult.insertId;

    const logItemsData = logItems.map((item) => [
      item.product_id,
      item.quantity,
      item.note || '',
      inventoryLogsId,
    ]);

    const query = `INSERT INTO inventory_logitem (product_id, quantity, note, inventory_logsId) VALUES ?`;
    await db.query(query, [logItemsData]);

    res.status(201).json({ message: 'Incoming products created' });
  } catch (error) {
    console.error('Error creating incoming products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const createProductsExport = asyncHandler(async (req, res) => {
  const { logItems, user_id } = req.body;

  if (!logItems || logItems.length === 0) {
    res.status(400);
    return res.status(400).json({ message: 'Products are required' });
  }

  const type_id = 2;
  const status_id = 1;

  try {
    const [inventoryLogsResult] = await db.query(
      `INSERT INTO inventory_logs (type_id,status_id, user_id) VALUES (?,?,?)`,
      [type_id, status_id, user_id]
    );

    const inventoryLogsId = inventoryLogsResult.insertId;

    const logItemsData = logItems.map((item) => [
      item.product_id,
      item.quantity,
      item.note || '',
      inventoryLogsId,
    ]);

    const query = `INSERT INTO inventory_logitem (product_id, quantity, note, inventory_logsId) VALUES ?`;
    await db.query(query, [logItemsData]);

    res.status(201).json({ message: 'Incoming products created' });
  } catch (error) {
    console.error('Error creating incoming products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const acceptProductsIncoming = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProduct = await db.query(
    'SELECT * FROM inventory_logs WHERE id = ? AND type_id = 1 AND status_id = 1',
    [id]
  );

  if (existingProduct[0].length === 0) {
    return res.status(404).json({ message: 'Incoming product not found' });
  }

  const query = 'UPDATE inventory_logs SET status_id = 2 WHERE id = ?';

  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Incoming product not found');
  }

  const products = await db.query(
    'SELECT * FROM inventory_logitem WHERE inventory_logsId = ?',
    [id]
  );

  for (const product of products[0]) {
    const existingInventory = await db.query(
      'SELECT * FROM inventory WHERE product_id = ?',
      [product.product_id]
    );

    if (existingInventory[0].length > 0) {
      const query =
        'UPDATE inventory SET quantity = quantity + ? WHERE product_id = ?';

      await db.query(query, [product.quantity, product.product_id]);
    } else {
      const query =
        'INSERT INTO inventory (product_id, quantity) VALUES (?, ?)';

      await db.query(query, [product.product_id, product.quantity]);
    }
  }

  res.status(200).json({ message: 'Incoming product accepted' });
});

const acceptProductsExport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProduct = await db.query(
    'SELECT * FROM inventory_logs WHERE id = ? AND type_id = 2 AND status_id = 1',
    [id]
  );

  if (existingProduct[0].length === 0) {
    return res.status(404).json({ message: 'Export product not found' });
  }

  const query = 'UPDATE inventory_logs SET status_id = 2 WHERE id = ?';

  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Export product not found');
  }

  const products = await db.query(
    'SELECT * FROM inventory_logitem WHERE inventory_logsId = ?',
    [id]
  );

  for (const product of products[0]) {
    const existingInventory = await db.query(
      'SELECT * FROM inventory WHERE product_id = ?',
      [product.product_id]
    );

    if (existingInventory[0].length > 0) {
      const query =
        'UPDATE inventory SET quantity = quantity - ? WHERE product_id = ?';

      await db.query(query, [product.quantity, product.product_id]);
    } else {
      res.status(404);
      throw new Error('Product not found in inventory');
    }
  }

  res.status(200).json({ message: 'Export product accepted' });
});

const refuseProductsIncomingExport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingProduct = await db.query(
    'SELECT * FROM inventory_logs WHERE id = ? AND status_id = 1',
    [id]
  );

  if (existingProduct[0].length === 0) {
    return res.status(404).json({ message: 'Incoming product not found' });
  }

  const query = 'UPDATE inventory_logs SET status_id = 3 WHERE id = ?';

  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Incoming product not found');
  }

  res.status(200).json({ message: 'Incoming product refused' });
});

const updateProductsLog = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const { products, user_id } = req.body;

  if (!products || products.length === 0) {
    res.status(400);
    return res.status(400).json({ message: 'Products are required' });
  }

  try {
    const update = await db.query(
      `
    UPDATE inventory_logs SET  user_id = ? WHERE id = ? AND status_id = 1`,
      [user_id, id]
    );

    if (update[0].affectedRows === 0) {
      res.status(404);
      throw new Error('Incoming product not found');
    }

    for (const product of products) {
      const { logs_id, product_id, quantity, note } = product;

      const query = `UPDATE inventory_logitem SET product_id = ?, quantity = ?, note = ? WHERE inventory_logsId = ? And id = ?`;

      await db.query(query, [product_id, quantity, note, id, logs_id]);
    }

    res.status(200).json({ message: 'Log product updated' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteProductsIncomingExport = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exitingProduct = await db.query(
    'SELECT * FROM inventory_logs WHERE id = ?',
    [id]
  );

  if (exitingProduct[0].length === 0) {
    return res.status(404).json({ message: 'Incoming product not found' });
  }

  const exitingProductItem = await db.query(
    `SELECT * FROM inventory_logitem WHERE inventory_logsId = ?`,
    [id]
  );

  if (exitingProductItem[0].length > 0) {
    const query = 'DELETE FROM inventory_logitem WHERE inventory_logsId = ?';

    await db.query(query, [id]);
  }

  const query = 'DELETE FROM inventory_logs WHERE id = ?';

  const [result] = await db.query(query, [id]);

  if (result.affectedRows === 0) {
    res.status(404);
    throw new Error('Incoming/Export product not found');
  }

  res.status(200).json({ message: 'Incoming/Export product removed' });
});

const getAllProductInventoryIncoming = asyncHandler(async (req, res) => {
  const { page } = req.query;

  if (!page || isNaN(page) || page < 1) {
    return res.status(400).json({ message: 'Valid page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      inventory_logs.*, 
      users.username AS user_name,
      inventory_type.type_name AS type_name,
      inventory_status.status_name AS status_name
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE inventory_logs.type_id = 1 AND inventory_logs.status_id = 1
    LIMIT ? OFFSET ?`;

  let countQuery = `
     SELECT COUNT(*) as total_inventory 
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE inventory_logs.type_id = 1 AND inventory_logs.status_id = 1`;

  try {
    const [countResult] = await db.query(countQuery);
    const total = countResult[0].total_inventory;
    const totalPages = Math.ceil(total / limit);

    const [inventoryLogs] = await db.query(query, [limit, offset]);

    const logIds = inventoryLogs.map((log) => log.id);
    let logItemsQuery = `
  SELECT 
    inventory_logItem.*, 
    products.name AS product_name 
  FROM 
    inventory_logItem
  JOIN 
    products ON inventory_logItem.product_id = products.id
  WHERE 
    inventory_logsId IN (?)`;

    const [logItems] = await db.query(logItemsQuery, [logIds]);

    const groupedLogItems = logItems.reduce((acc, item) => {
      if (!acc[item.inventory_logsId]) {
        acc[item.inventory_logsId] = [];
      }
      acc[item.inventory_logsId].push(item);
      return acc;
    }, {});

    const inventoryLogsWithItems = inventoryLogs.map((log) => ({
      ...log,
      items: groupedLogItems[log.id] || [],
    }));

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_inventory: total,
      total_pages: totalPages,
      data: inventoryLogsWithItems,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getProductInventoryIncomingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const logQuery = ` 
    SELECT 
      inventory_logs.*, 
      users.username AS user_name,
      inventory_type.type_name AS type_name,
      inventory_status.status_name AS status_name
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE inventory_logs.id = ?`;

  const [logRows] = await db.query(logQuery, [id]);

  if (logRows.length === 0) {
    return res.status(404).json({ message: 'Inventory log not found' });
  }

  const logItemsQuery = `
    SELECT 
      inventory_logItem.*, 
      products.product_name AS product_name
    FROM inventory_logItem
    JOIN products ON inventory_logItem.product_id = products.id
    WHERE inventory_logItem.inventory_logsId = ?`;

  const [logItemsRows] = await db.query(logItemsQuery, [id]);

  res.json({
    data: logRows[0],
    items: logItemsRows,
  });
});

const getProductInventoryExportById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const logQuery = ` 
    SELECT 
      inventory_logs.*, 
      users.username AS user_name,
      inventory_type.type_name AS type_name,
      inventory_status.status_name AS status_name
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE inventory_logs.id = ?`;

  const [logRows] = await db.query(logQuery, [id]);

  if (logRows.length === 0) {
    return res.status(404).json({ message: 'Inventory log not found' });
  }

  const logItemsQuery = `
    SELECT 
      inventory_logItem.*, 
      products.product_name AS product_name
    FROM inventory_logItem
    JOIN products ON inventory_logItem.product_id = products.id
    WHERE inventory_logItem.inventory_logsId = ?`;

  const [logItemsRows] = await db.query(logItemsQuery, [id]);

  res.json({
    data: logRows[0],
    items: logItemsRows,
  });
});

const getAllProductInventoryExport = asyncHandler(async (req, res) => {
  const { page } = req.query;
  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      inventory_logs.*, 
      users.username AS user_name,
      inventory_type.type_name AS type_name,
      inventory_status.status_name AS status_name
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE inventory_logs.type_id = 2 AND inventory_logs.status_id = 1
    LIMIT ? OFFSET ?`;

  let countQuery = `
     SELECT COUNT(*) as total_inventory 
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE inventory_logs.type_id = 2 AND inventory_logs.status_id = 1`;

  try {
    const [countResult] = await db.query(countQuery);
    const total = countResult[0].total_inventory;
    const totalPages = Math.ceil(total / limit);

    const [inventoryLogs] = await db.query(query, [limit, offset]);

    const logIds = inventoryLogs.map((log) => log.id);
    let logItemsQuery = `
  SELECT 
    inventory_logItem.*, 
    products.name AS product_name 
  FROM 
    inventory_logItem
  JOIN 
    products ON inventory_logItem.product_id = products.id
  WHERE 
    inventory_logsId IN (?)`;

    const [logItems] = await db.query(logItemsQuery, [logIds]);

    const groupedLogItems = logItems.reduce((acc, item) => {
      if (!acc[item.inventory_logsId]) {
        acc[item.inventory_logsId] = [];
      }
      acc[item.inventory_logsId].push(item);
      return acc;
    }, {});

    const inventoryLogsWithItems = inventoryLogs.map((log) => ({
      ...log,
      items: groupedLogItems[log.id] || [],
    }));

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_inventory: total,
      total_pages: totalPages,
      data: inventoryLogsWithItems,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getAllHistoryProductInventoryIncoming = asyncHandler(async (req, res) => {
  const { page } = req.query;
  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      inventory_logs.*, 
      users.username AS user_name,
      inventory_type.type_name AS type_name,
      inventory_status.status_name AS status_name
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE 1=1 AND inventory_logs.type_id = 1 AND inventory_logs.status_id = 2
    LIMIT ? OFFSET ?
    `;

  let countQuery = `
    SELECT COUNT(*) as total_inventory 
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE 1=1 AND inventory_logs.type_id = 1 AND inventory_logs.status_id = 2`;

  try {
    const [countResult] = await db.query(countQuery);
    const total = countResult[0].total_inventory;
    const totalPages = Math.ceil(total / limit);

    const [inventoryLogs] = await db.query(query, [limit, offset]);

    const logIds = inventoryLogs.map((log) => log.id);
    let logItemsQuery = `
  SELECT 
    inventory_logItem.*, 
    products.name AS product_name 
  FROM 
    inventory_logItem
  JOIN 
    products ON inventory_logItem.product_id = products.id
  WHERE 
    inventory_logsId IN (?)`;

    const [logItems] = await db.query(logItemsQuery, [logIds]);

    const groupedLogItems = logItems.reduce((acc, item) => {
      if (!acc[item.inventory_logsId]) {
        acc[item.inventory_logsId] = [];
      }
      acc[item.inventory_logsId].push(item);
      return acc;
    }, {});

    const inventoryLogsWithItems = inventoryLogs.map((log) => ({
      ...log,
      items: groupedLogItems[log.id] || [],
    }));

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_inventory: total,
      total_pages: totalPages,
      data: inventoryLogsWithItems,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getAllHistoryProductInventoryExport = asyncHandler(async (req, res) => {
  const { page } = req.query;
  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      inventory_logs.*, 
      users.username AS user_name,
      inventory_type.type_name AS type_name,
      inventory_status.status_name AS status_name
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE 1=1 AND inventory_logs.type_id = 2 AND inventory_logs.status_id = 2
    LIMIT ? OFFSET ?`;

  let countQuery = `
    SELECT COUNT(*) as total_inventory 
    FROM inventory_logs
    JOIN users ON inventory_logs.user_id = users.id
    JOIN inventory_type ON inventory_logs.type_id = inventory_type.id
    JOIN inventory_status ON inventory_logs.status_id = inventory_status.id
    WHERE 1=1 AND inventory_logs.type_id = 2 AND inventory_logs.status_id = 2`;

  try {
    const [countResult] = await db.query(countQuery);
    const total = countResult[0].total_inventory;
    const totalPages = Math.ceil(total / limit);

    const [inventoryLogs] = await db.query(query, [limit, offset]);

    const logIds = inventoryLogs.map((log) => log.id);
    let logItemsQuery = `
  SELECT 
    inventory_logItem.*, 
    products.name AS product_name 
  FROM 
    inventory_logItem
  JOIN 
    products ON inventory_logItem.product_id = products.id
  WHERE 
    inventory_logsId IN (?)`;

    const [logItems] = await db.query(logItemsQuery, [logIds]);

    const groupedLogItems = logItems.reduce((acc, item) => {
      if (!acc[item.inventory_logsId]) {
        acc[item.inventory_logsId] = [];
      }
      acc[item.inventory_logsId].push(item);
      return acc;
    }, {});

    const inventoryLogsWithItems = inventoryLogs.map((log) => ({
      ...log,
      items: groupedLogItems[log.id] || [],
    }));

    res.json({
      page: parseInt(page, 10),
      per_page: limit,
      total_inventory: total,
      total_pages: totalPages,
      data: inventoryLogsWithItems,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export {
  getAllProductInventory,
  getProductInventoryById,
  createProductInventory,
  updateProductInventory,
  deleteProductInventory,
  createProductsIncoming,
  updateProductsLog,
  createProductsExport,
  deleteProductsIncomingExport,
  acceptProductsIncoming,
  acceptProductsExport,
  refuseProductsIncomingExport,
  getAllProductInventoryIncoming,
  getAllProductInventoryExport,
  getAllHistoryProductInventoryIncoming,
  getAllHistoryProductInventoryExport,
  getProductInventoryIncomingById,
  getProductInventoryExportById,
};
