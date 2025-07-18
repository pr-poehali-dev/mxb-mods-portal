// Симуляция системы авторизации
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  balance: number;
  avatar?: string;
  joinDate: Date;
  totalDownloads: number;
  totalUploads: number;
  premium: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Симуляция текущего пользователя
export const mockUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@mxbikes.com',
  role: 'admin',
  balance: 1500.00,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
  joinDate: new Date('2023-01-15'),
  totalDownloads: 234,
  totalUploads: 18,
  premium: true
};

// Симуляция состояния авторизации
let authState: AuthState = {
  user: null,
  isAuthenticated: false
};

export const login = (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@mxbikes.com' && password === 'admin') {
        authState = {
          user: mockUser,
          isAuthenticated: true
        };
        resolve(mockUser);
      } else {
        reject(new Error('Неверный email или пароль'));
      }
    }, 1000);
  });
};

export const logout = (): void => {
  authState = {
    user: null,
    isAuthenticated: false
  };
};

export const getAuthState = (): AuthState => authState;

export const isAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const updateBalance = (amount: number): void => {
  if (authState.user) {
    authState.user.balance += amount;
  }
};