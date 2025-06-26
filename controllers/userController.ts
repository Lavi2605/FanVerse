import { Request, Response } from 'express';
import { query } from '../src/config/database';

// Get all users (for search functionality)
export async function getAllUsers(req: Request, res: Response): Promise<void> {
  try {
    const search = req.query.search as string;
    const limit = parseInt(req.query.limit as string) || 50;
    const offset = parseInt(req.query.offset as string) || 0;

    let queryText = `
      SELECT id, username, email, first_name, last_name, avatar_url, created_at
      FROM users 
      WHERE is_active = true
    `;
    const queryParams: (string | number)[] = [];

    if (search) {
      queryText += `
        AND (
          username ILIKE $1 OR 
          email ILIKE $1 OR 
          first_name ILIKE $1 OR 
          last_name ILIKE $1 OR
          CONCAT(first_name, ' ', last_name) ILIKE $1
        )
      `;
      queryParams.push(`%${search}%`);
    }

    queryText += ` ORDER BY username ASC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(limit, offset);

    const users = await query(queryText, queryParams);

    // Count query
    let countQuery = `SELECT COUNT(*) as total FROM users WHERE is_active = true`;
    const countParams: string[] = [];

    if (search) {
      countQuery += `
        AND (
          username ILIKE $1 OR 
          email ILIKE $1 OR 
          first_name ILIKE $1 OR 
          last_name ILIKE $1 OR
          CONCAT(first_name, ' ', last_name) ILIKE $1
        )
      `;
      countParams.push(`%${search}%`);
    }

    const countResult = await query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].total);

    res.json({
      success: true,
      data: {
        users: users.rows,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      },
    });

  } catch (error) {
    console.error('Error in getAllUsers:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve users',
    });
  }
}

// Get user by ID
export async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        success: false,
        error: 'User ID is required',
      });
      return;
    }

    const user = await query(
      `
      SELECT id, first_name, last_name, email, avatar_url
      FROM users
      WHERE is_active = true AND id = $1
    `,
      [userId]
    );

    if (user.rows.length === 0) {
      res.status(404).json({
        success: false,
        error: 'User not found',
      });
      return;
    }

    res.json({
      success: true,
      data: user.rows[0],
    });

  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve user',
    });
  }
}

// Create a new user (for testing purposes)
export async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      avatar_url,
    } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        error: 'Username, email, and password are required',
      });
      return;
    }

    const existingUser = await query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      res.status(409).json({
        success: false,
        error: 'User with this username or email already exists',
      });
      return;
    }

    const newUser = await query(
      `
      INSERT INTO users (username, email, password_hash, first_name, last_name, avatar_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username, email, first_name, last_name, avatar_url, created_at
    `,
      [
        username,
        email,
        password, // 🚨 In production, make sure this is hashed!
        first_name || null,
        last_name || null,
        avatar_url || null,
      ]
    );

    res.status(201).json({
      success: true,
      data: newUser.rows[0],
    });

  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create user',
    });
  }
}
