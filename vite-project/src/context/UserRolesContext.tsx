import React, { createContext } from "react";
import type { IUser, IRole } from "../services/apis/user/user.interface";
import { getUsers, getRoles } from "../services/apis/user/user.api";
import { useOnceEffect } from "../hooks/useOnceEffect";

interface UserContextType {
  users: IUser[];
  roles: IRole[];
  loading: boolean;
  refresh: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [roles, setRoles] = React.useState<IRole[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [userRes, roleRes] = await Promise.all([getUsers(), getRoles()]);

      setRoles(roleRes);
      setUsers(userRes);
    } catch (error) {
      console.error("Fetch user error:", error);
    } finally {
      setLoading(false);
    }
  };

  useOnceEffect(() => {
    fetchAll();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        roles,
        loading,
        refresh: fetchAll,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
