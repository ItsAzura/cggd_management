import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllProduct = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products');
  res.json(rows);
});

const getCountProduct = asyncHandler(async (req, res) => {
  const count_product = 'SELECT COUNT(*) AS total_product FROM products;';

  const [rows] = await db.query(count_product);
  res.json(rows);
});

const getTopOrderProduct = asyncHandler(async (req, res) => {
  const top_order_product = `SELECT 
    p.id, 
    p.name, 
    p.category_id, 
    p.size_id, 
    p.color_id, 
    p.material, 
    p.price, 
    p.supplier_id, 
    p.image, 
    p.description, 
    COUNT(oi.order_id) AS order_count,  
    SUM(oi.quantity) AS total_quantity 
FROM 
    products p
JOIN 
    order_items oi ON p.id = oi.product_id
GROUP BY 
    p.id, 
    p.name, 
    p.category_id, 
    p.size_id, 
    p.color_id, 
    p.material, 
    p.price, 
    p.supplier_id, 
    p.image, 
    p.description
ORDER BY 
    order_count DESC
LIMIT 5;
`;

  const [rows] = await db.query(top_order_product);
  res.json(rows);
});

export { getCountProduct, getAllProduct, getTopOrderProduct };
