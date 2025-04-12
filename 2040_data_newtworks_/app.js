const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// MySQL connection configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'db',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'root',
  database: process.env.MYSQL_DATABASE || 'mydb'
};

// Create a connection pool
const pool = mysql.createPool(dbConfig);

// Middleware
app.use(express.json());

// Test database connection
app.get('/test-db', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT 1 + 1 AS result');
    connection.release();
    res.json({ message: 'Database connection successful', result: rows[0].result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to Node.js with MySQL!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 