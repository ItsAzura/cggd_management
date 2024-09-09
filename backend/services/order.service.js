import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllOrder = asyncHandler(async (req, res) => {
  const { customer_id, total_amount, status_id, page } = req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 6;
  const offset = (page - 1) * limit;

  let query = `
    SELECT 
      orders.*, 
      customers.customer_name AS customer_name, 
      order_status.status_name
    FROM orders
    JOIN customers ON orders.customer_id = customers.id
    JOIN order_status ON orders.status_id = order_status.id
    WHERE 1=1`;

  let countQuery = `
    SELECT COUNT(*) as total_order
    FROM orders
    JOIN customers ON orders.customer_id = customers.id
    JOIN order_status ON orders.status_id = order_status.id
    WHERE 1=1`;

  const values = [];

  if (customer_id) {
    query += ' AND customers.id = ?';
    countQuery += ' AND customers.id = ?';
    values.push(customer_id);
  }

  if (total_amount) {
    query += ' AND orders.total_amount = ?';
    countQuery += ' AND orders.total_amount = ?';
    values.push(total_amount);
  }

  if (status_id) {
    query += ' AND order_status.id = ?';
    countQuery += ' AND order_status.id = ?';
    values.push(status_id);
  }

  query += ' LIMIT ? OFFSET ?';

  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_order;
    const totalPages = Math.ceil(total / limit);
    const [rows] = await db.query(query, [...values, limit, offset]);

    res.json({
      page: parseInt(page, 6),
      per_page: limit,
      total_order: total,
      total_pages: totalPages,
      data: rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getTotalAmount = asyncHandler(async (req, res) => {
  const total_amount =
    'SELECT SUM(CAST(total_amount AS UNSIGNED)) AS total_sum FROM orders WHERE status_id = 2;';

  const [rows] = await db.query(total_amount);
  res.json(rows);
});

const getCountOrder = asyncHandler(async (req, res) => {
  const count_order = 'SELECT COUNT(*) AS total_order FROM orders;';

  const [rows] = await db.query(count_order);
  res.json(rows);
});

const getTotalAmountEveryMonth = asyncHandler(async (req, res) => {
  const total_amount_every_month = `
  SELECT 
    DATE_FORMAT(created_at, '%M') AS month, 
    SUM(CAST(total_amount AS UNSIGNED)) AS total_amount_sum
FROM 
    orders
WHERE 
    status_id = 2
GROUP BY 
    DATE_FORMAT(created_at, '%M')
ORDER BY 
    month;
  `;

  const [rows] = await db.query(total_amount_every_month);
  res.json(rows);
});

const getCountCategory = asyncHandler(async (req, res) => {
  const count_category = `
  SELECT 
    c.cate_name AS category_name,
    COUNT(DISTINCT oi.order_id) AS order_count
FROM 
    categories c
JOIN 
    products p ON c.id = p.category_id
JOIN 
    order_items oi ON p.id = oi.product_id
GROUP BY 
    c.id, c.cate_name
ORDER BY 
    order_count DESC;

  `;

  const [rows] = await db.query(count_category);
  res.json(rows);
});

const createOrder = asyncHandler(async (req, res) => {
  const { customer_id, status_id, order_items } = req.body;

  if (!customer_id || !status_id || !order_items || order_items.length === 0) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    let total_amount = 0;

    for (const item of order_items) {
      const { product_id, quantity } = item;

      // Fetch the price from the products table
      const [productResult] = await db.query(
        'SELECT price FROM products WHERE id = ?',
        [product_id]
      );

      if (productResult.length === 0) {
        throw new Error(`Product with ID ${product_id} not found`);
      }

      const price = productResult[0].price;
      total_amount += price * quantity;

      item.price = price;
    }

    const [orderResult] = await db.query(
      'INSERT INTO orders (customer_id, total_amount, status_id) VALUES (?, ?, ?)',
      [customer_id, total_amount, status_id]
    );
    const order_id = orderResult.insertId;

    for (const item of order_items) {
      const { product_id, quantity, price } = item;
      await db.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, product_id, quantity, price]
      );
    }

    res.status(201).json({
      order_id,
      total_amount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const updateOrder = asyncHandler(async (req, res) => {
  const order_id = req.params.id;
  const { status_id, order_items } = req.body;

  if (!order_id) {
    return res.status(400).json({ message: 'Order ID is required' });
  }

  try {
    if (status_id) {
      await db.query('UPDATE orders SET status_id = ? WHERE id = ?', [
        status_id,
        order_id,
      ]);
    }

    if (order_items && order_items.length > 0) {
      await db.query('DELETE FROM order_items WHERE order_id = ?', [order_id]);

      let total_amount = 0;

      for (const item of order_items) {
        const { product_id, quantity } = item;
        const [product] = await db.query(
          'SELECT price FROM products WHERE id = ?',
          [product_id]
        );

        if (product.length === 0) {
          await db.rollback();
          return res
            .status(404)
            .json({ message: `Product with ID ${product_id} not found` });
        }

        const price = product[0].price;
        total_amount += price * quantity;

        await db.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [order_id, product_id, quantity, price]
        );
      }

      await db.query('UPDATE orders SET total_amount = ? WHERE id = ?', [
        total_amount,
        order_id,
      ]);
    }

    res.status(200).json({
      message: 'Order updated successfully',
      order_id,
      status_id,
      order_items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order_id = req.params.id;

  if (!order_id) {
    return res.status(400).json({ message: 'Order ID is required' });
  }

  try {
    const [order] = await db.query('SELECT * FROM orders WHERE id = ?', [
      order_id,
    ]);

    if (order.length === 0) {
      await db.rollback();
      return res
        .status(404)
        .json({ message: `Order with ID ${order_id} not found` });
    }

    await db.query('DELETE FROM orders WHERE id = ?', [order_id]);

    res
      .status(200)
      .json({ message: 'Order and related order items deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export {
  getAllOrder,
  getTotalAmount,
  getCountOrder,
  getTotalAmountEveryMonth,
  getCountCategory,
  createOrder,
  updateOrder,
  deleteOrder,
};
