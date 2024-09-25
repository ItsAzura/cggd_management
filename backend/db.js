import mysql from 'mysql2/promise';
import { DATABASE_NAME } from './lib/constants.js';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'quang4869',
  database: DATABASE_NAME,
});

export default pool;
