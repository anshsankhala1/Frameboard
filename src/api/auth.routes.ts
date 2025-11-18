import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken, authMiddleware } from '../middleware/auth';
import type { RegisterInput, LoginInput, AuthResponse, UserResponse } from '../types/user';

const router = Router();

// POST /api/auth/register - Register a new user
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, name, password }: RegisterInput = req.body;

    // Validation
    if (!email || !name || !password) {
      return res.status(400).json({
        error: 'Email, name, and password are required'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        error: 'User with this email already exists'
      });
    }

    // Create user
    const user = new User({
      email: email.toLowerCase(),
      name,
      password
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString(), user.email);

    // Return user and token (convert to response format)
    const userResponse: UserResponse = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const response: AuthResponse = {
      user: userResponse,
      token,
    };

    return res.status(201).json(response);
  } catch (error) {
    console.error('Error in /register route:', error);

    // Handle MongoDB duplicate key error
    if (error instanceof Error && 'code' in error && (error as any).code === 11000) {
      return res.status(409).json({
        error: 'User with this email already exists'
      });
    }

    return res.status(500).json({
      error: 'Failed to register user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginInput = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Verify password using the model's comparePassword method
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

    // Generate token
    const token = generateToken(user._id.toString(), user.email);

    // Return user and token (convert to response format)
    const userResponse: UserResponse = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    const response: AuthResponse = {
      user: userResponse,
      token,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in /login route:', error);

    return res.status(500).json({
      error: 'Failed to login',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authMiddleware, async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Convert to response format
    const userResponse: UserResponse = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };

    return res.status(200).json({
      user: userResponse
    });
  } catch (error) {
    console.error('Error in /me route:', error);

    return res.status(500).json({
      error: 'Failed to get user',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
