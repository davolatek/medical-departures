import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'your-db-host',
  user: 'your-db-user',
  password: 'your-db-password',
  database: 'your-db-name',
});

export { pool };
