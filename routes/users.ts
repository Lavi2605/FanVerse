import express from 'express';
import pool from '../src/config/database.ts';

const router = express.Router();

// ✅ GET /api/users - fetch users with first_name, last_name, email
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, first_name, last_name, email
      FROM users
      WHERE is_active = true
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

export default router;
