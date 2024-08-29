import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllOrder = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM orders');
  res.json(rows);
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
    DATE_FORMAT(created_at, '%Y-%m') AS month_year, 
    SUM(CAST(total_amount AS UNSIGNED)) AS total_amount_sum
FROM 
    orders
WHERE 
    status_id = 2
GROUP BY 
    DATE_FORMAT(created_at, '%Y-%m')
ORDER BY 
    month_year;
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

export {
  getAllOrder,
  getTotalAmount,
  getCountOrder,
  getTotalAmountEveryMonth,
  getCountCategory,
};
