import asyncHandler from '../middlewares/asyncHandler.js';
import db from '../db.js';
import createToken from '../utils/createToken.js';
import bcrypt from 'bcryptjs';

const getAllUsers = asyncHandler(async (req, res) => {
  const { email, username, user_password, role_id, page } = req.query;

  if (!page) {
    return res.status(400).json({ message: 'Page number is required' });
  }

  const limit = 10;
  const offset = (page - 1) * limit;

  let query = `
        SELECT 
        users.*, 
        roles.role_name
        FROM users
        JOIN roles ON users.role_id = roles.id
        WHERE 1=1`;

  let countQuery = `
    SELECT COUNT(*) as total_users
    FROM users
    JOIN roles ON users.role_id = roles.id
    WHERE 1=1
    `;

  const values = [];

  if (email) {
    query += ' AND email LIKE ?';
    countQuery += ' AND email LIKE ?';
    values.push(`%${email}%`);
  }

  if (username) {
    query += ' AND username LIKE ?';
    countQuery += ' AND username LIKE ?';
    values.push(`%${username}%`);
  }

  if (role_id) {
    query += ' AND role_id = ?';
    countQuery += ' AND role_id = ?';
    values.push(role_id);
  }

  query += ' LIMIT ? OFFSET ?';

  try {
    const [count] = await db.query(countQuery, values);
    const total = count[0].total_users;
    const totalPages = Math.ceil(total / limit);
    const [users] = await db.query(query, [...values, limit, offset]);
    res.status(200).json({
      page: parseInt(page, 10),
      per_page: limit,
      total_users: total,
      total_pages: totalPages,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const createUser = asyncHandler(async (req, res) => {
  const { email, username, user_password } = req.body;
  const role_id = 2;

  if (!email || !username || !user_password) {
    return res
      .status(400)
      .json({ message: 'Email, username, and password are required' });
  }

  const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

  if (existingUser[0].length) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user_password, salt);

  try {
    const [result] = await db.query(
      'INSERT INTO users (email, username, user_password, role_id) VALUES (?, ?, ?, ?)',
      [email, username, hashedPassword, role_id]
    );

    res.status(201).json({
      message: 'User created successfully',
      id: result.insertId,
      username: username,
      email: email,
      role_id: role_id,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, user_password } = req.body;

  const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [
    email,
  ]);

  if (existingUser[0].length) {
    const isMatch = await bcrypt.compare(
      user_password,
      existingUser[0][0].user_password
    );
    if (isMatch) {
      createToken(res, existingUser[0][0].id);

      res.status(200).json({
        message: 'User logged in successfully',
        id: existingUser[0][0].id,
        username: existingUser[0][0].username,
        email: existingUser[0][0].email,
        role_id: existingUser[0][0].role_id,
      });

      return;
    }
  } else {
    res.status(400).json({ message: 'Invalid credentials provided' });
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('cggd_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'User logged out successfully' });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await db.query(
    'SELECT id, email, username, role_id FROM users WHERE id = ?',
    [req.user.id]
  );

  res.json(user[0][0]);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, username, user_password } = req.body;

  const user = await db.query('SELECT * FROM users WHERE id = ?', [
    req.user.id,
  ]);

  if (user[0].length === 0) {
    res.status(404);
    throw new Error('User not found');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user_password, salt);

  await db.query(
    'UPDATE users SET email = ?, username = ?, user_password = ? WHERE id = ?',
    [email, username, hashedPassword, req.user.id]
  );

  res.json({ message: 'User updated successfully' });
});

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.query(
    'SELECT id, email, username, role_id FROM users WHERE id = ?',
    [id]
  );

  if (user[0].length === 0) {
    res.status(404);
    throw new Error('User not found');
  }

  res.json(user[0][0]);
});

const updateUserById = asyncHandler(async (req, res) => {
  const { email, username, user_password } = req.body;
  const { id } = req.params;

  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);

  if (user[0].length === 0) {
    res.status(404);
    throw new Error('User not found');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user_password, salt);

  await db.query(
    'UPDATE users SET email = ?, username = ?, user_password = ? WHERE id = ?',
    [email, username, hashedPassword, id]
  );

  res.json({ message: 'User updated successfully' });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);

  if (user[0][0].role_id === 3) {
    res.status(403);
    throw new Error('You cannot delete an admin user');
  }

  if (user[0].length === 0) {
    res.status(404);
    throw new Error('User not found');
  }

  await db.query('DELETE FROM users WHERE id = ?', [id]);

  res.json({ message: 'User removed' });
});

export {
  getAllUsers,
  createUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUserById,
  updateUserById,
  deleteUser,
};
