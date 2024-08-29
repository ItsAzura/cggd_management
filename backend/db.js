import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'quang4869',
  database: 'cggd_db',
});

export default pool;
