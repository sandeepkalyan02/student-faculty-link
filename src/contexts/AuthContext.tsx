
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import prisma from '@/lib/prisma';
import { hash, compare } from 'bcryptjs';

type UserRole = 'student' | 'faculty' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  checkAccess: (allowedRoles: UserRole[]) => boolean;
}

// Sample users for demo
const SAMPLE_USERS = [
  {
    id: 's1',
    email: 'student@example.com',
    password: '$2a$10$aMmQ81SFB7XnErSxxXooxeuoXK.YT1nNwgU9QXu6JpUb8QMmF18si', // password123
    name: 'John Student',
    role: 'student' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  },
  {
    id: 'f1',
    email: 'faculty@example.com',
    password: '$2a$10$aMmQ81SFB7XnErSxxXooxeuoXK.YT1nNwgU9QXu6JpUb8QMmF18si', // password123
    name: 'Dr. Smith',
    role: 'faculty' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Smith'
  },
  {
    id: 'a1',
    email: 'admin@example.com',
    password: '$2a$10$aMmQ81SFB7XnErSxxXooxeuoXK.YT1nNwgU9QXu6JpUb8QMmF18si', // password123
    name: 'Admin User',
    role: 'admin' as UserRole,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'
  }
];

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  checkAccess: () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Seed database with sample users on first load
  useEffect(() => {
    const seedUsers = async () => {
      try {
        // Check if users already exist
        const userCount = await prisma.user.count();
        
        if (userCount === 0) {
          // Create sample users
          for (const sampleUser of SAMPLE_USERS) {
            await prisma.user.create({
              data: {
                id: sampleUser.id,
                email: sampleUser.email,
                password: sampleUser.password, // Already hashed
                name: sampleUser.name,
                role: sampleUser.role,
                avatar: sampleUser.avatar
              }
            });
          }
          console.log('Sample users created successfully');
        }
      } catch (error) {
        console.error('Failed to seed users:', error);
      }
    };

    seedUsers();
  }, []);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Find user in database
      const foundUser = await prisma.user.findFirst({
        where: {
          email: email,
          role: role
        }
      });
      
      if (!foundUser) {
        toast.error('Login failed', {
          description: 'User not found with this email and role'
        });
        return false;
      }
      
      // Check password
      const passwordMatch = await compare(password, foundUser.password);
      
      if (!passwordMatch) {
        toast.error('Login failed', {
          description: 'Invalid password'
        });
        return false;
      }
      
      // Create user object without password
      const userWithoutPassword = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Login successful', {
        description: `Welcome back, ${userWithoutPassword.name}!`
      });
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed', {
        description: 'An error occurred during login'
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          email: email
        }
      });
      
      if (existingUser) {
        toast.error('Registration failed', {
          description: 'User with this email already exists'
        });
        return false;
      }
      
      // Hash password
      const hashedPassword = await hash(password, 10);
      
      // Create new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name.replace(/\s+/g, '')}`
        }
      });
      
      // Create user object without password
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        avatar: newUser.avatar
      };
      
      setUser(userWithoutPassword);
      localStorage.setItem('auth_user', JSON.stringify(userWithoutPassword));
      
      toast.success('Registration successful', {
        description: `Welcome, ${userWithoutPassword.name}!`
      });
      
      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'faculty') {
        navigate('/faculty/dashboard');
      } else {
        navigate('/student/dashboard');
      }
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed', {
        description: 'An error occurred during registration'
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
    toast.info('You have been logged out');
    navigate('/');
  };

  const checkAccess = (allowedRoles: UserRole[]): boolean => {
    if (!user) return false;
    return allowedRoles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        checkAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
