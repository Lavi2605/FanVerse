import express, { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './src/config/database';

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

app.use(cors());
app.use(express.json());

// Register endpoint
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password, gender, age, country, address, phone } = req.body;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    const result = await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, gender, age, country, address, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [firstName, lastName, email, hashedPassword, gender, age, country, address, phone]
    );

    res.json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Get user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ success: false, error: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if user has preferences
    const preferencesResult = await pool.query(
      'SELECT * FROM preferences WHERE user_id = $1',
      [user.id]
    );
    const hasPreferences = preferencesResult.rows.length > 0;

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        hasPreferences
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

// Save preferences endpoint
app.post('/api/preferences', async (req: Request, res: Response) => {
  try {
    const { userId, preferences } = req.body;
    const { games, movies_series, anime, cartoons } = preferences;

    await pool.query(
      'INSERT INTO preferences (user_id, games, movies_series, anime, cartoons) VALUES ($1, $2, $3, $4, $5)',
      [userId, games, movies_series, anime, cartoons]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Save preferences error:', error);
    res.status(500).json({ success: false, error: 'Failed to save preferences' });
  }
});

// Get preferences endpoint
app.get('/api/preferences/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT * FROM preferences WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Preferences not found' });
    }

    res.json({ success: true, preferences: result.rows[0] });
  } catch (error) {
    console.error('Get preferences error:', error);
    res.status(500).json({ success: false, error: 'Failed to get preferences' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 