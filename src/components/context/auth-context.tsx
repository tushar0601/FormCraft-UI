"use client";
import { createContext, useContext } from "react";

export type AppUser = {
  id: string;
  email?: string | null;
  name?: string | null;
};
const AuthCtx = createContext<{ user: AppUser | null }>({ user: null });

export function AuthProvider({
  user,
  children,
}: {
  user: AppUser | null;
  children: React.ReactNode;
}) {
  return <AuthCtx.Provider value={{ user }}>{children}</AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);
