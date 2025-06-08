import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD || '9188', // Actual PostgreSQL password
  host: 'localhost',
  port: 5432,
  database: 'fanverse',
  ssl: false // Disable SSL for local development
});

// Test the connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  release();
});

export default pool; 