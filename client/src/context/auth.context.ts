import React, { createContext } from 'react';

export interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
