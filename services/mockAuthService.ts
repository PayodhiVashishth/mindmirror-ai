import { User } from '../types';

// This service mocks a user database using localStorage.
// In a real application, this would be replaced with API calls to a backend.

const DB_KEY = 'mindmirror-users-db';

const getDb = async (): Promise<Record<string, User>> => {
  try {
    const dbString = localStorage.getItem(DB_KEY);
    return dbString ? JSON.parse(dbString) : {};
  } catch (e) {
    return {};
  }
};

const saveDb = async (db: Record<string, User>): Promise<void> => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const MOCK_USERS_DB = {
  findUserByUsername: async (username: string): Promise<User | null> => {
    const db = await getDb();
    const user = Object.values(db).find(u => u.username.toLowerCase() === username.toLowerCase());
    return user || null;
  },

  createUser: async (username: string, password_not_used: string): Promise<User> => {
    const db = await getDb();
    const newUser: User = {
      id: `user-${Date.now()}-${Math.random()}`,
      username,
    };
    db[newUser.id] = newUser;
    await saveDb(db);
    return newUser;
  },
};
