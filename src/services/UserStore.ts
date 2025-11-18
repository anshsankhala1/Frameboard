import { User, UserResponse } from '../types/user';
import bcrypt from 'bcrypt';

// In-memory storage for users (will persist until server restart)
// TODO: Replace with database when MongoDB is enabled
class UserStore {
  private users: Map<string, User> = new Map();

  // Create a new user
  async create(email: string, name: string, password: string): Promise<User> {
    // Check if user already exists
    const existing = this.findByEmail(email);
    if (existing) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const id = this.generateId();
    const user: User = {
      id,
      email: email.toLowerCase(),
      name,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(id, user);
    return user;
  }

  // Find user by email
  findByEmail(email: string): User | null {
    const normalizedEmail = email.toLowerCase();
    for (const user of this.users.values()) {
      if (user.email === normalizedEmail) {
        return user;
      }
    }
    return null;
  }

  // Find user by ID
  findById(id: string): User | null {
    return this.users.get(id) || null;
  }

  // Verify password
  async verifyPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  // Convert User to UserResponse (remove password)
  toResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  // Generate unique ID
  private generateId(): string {
    return `user-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  // Update user
  async update(id: string, data: Partial<Pick<User, 'name' | 'email'>>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updated: User = {
      ...user,
      ...data,
      updatedAt: new Date(),
    };

    this.users.set(id, updated);
    return updated;
  }
}

// Export singleton instance
export const userStore = new UserStore();
