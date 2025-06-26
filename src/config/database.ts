import { Pool } from 'pg';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = new Pool({
  user: 'postgres',
  password: process.env.DB_PASSWORD || 'psql', //Actual PostgreSQL password
  host: 'localhost',
  port: 5432,
  database: 'fanverse',
  ssl: false,
});


export const testConnection = async () => {
  const client = await pool.connect();
  try {
    const schemaPath = join(__dirname, 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    await client.query(schema);

    console.log('✅ Database schema initialized');
  } catch (err) {
    console.error('❌ DB Error:', err);
    throw err;
  } finally {
    client.release();
  }
};

// ✅ Export pool for general access
export default pool;

// ✅ Export query for shorthand usage in controllers
export const query = (text: string, params?: unknown[]) => {
  return pool.query(text, params);
};
