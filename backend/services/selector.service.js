import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';

const getAllColor = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM colors');
  res.json(rows);
});

const getAllSize = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM sizes');
  res.json(rows);
});

const getAllCategory = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM categories');
  res.json(rows);
});

const getAllInvertoryLocation = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM inventory_location');
  res.json(rows);
});

const getAllSuppliers = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM suppliers');
  res.json(rows);
});

const getAllRoles = asyncHandler(async (req, res) => {
  const [rows] = await db.query('SELECT * FROM roles');
  res.json(rows);
});

export {
  getAllColor,
  getAllSize,
  getAllCategory,
  getAllInvertoryLocation,
  getAllSuppliers,
  getAllRoles,
};
