
import React, { createContext, useState, useContext, ReactNode } from "react";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, userData?: Partial<User>) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, userData?: Partial<User>) => {
    // In a real app, this would validate credentials with an API
    // For demo purposes, we'll just set the user
    setUser({
      name: userData?.name || "Guest User",
      email: email,
      avatar: userData?.avatar || "/placeholder.svg",
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
