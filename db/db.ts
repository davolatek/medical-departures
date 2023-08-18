import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'medicaldeparturesdb2.chijx1knzyl0.us-east-1.rds.amazonaws.com:3306',
  user: 'root',
  password: '8NsU74qnIX2QQdZnGo9c',
  database: 'myblogdb',
});

export { pool };
