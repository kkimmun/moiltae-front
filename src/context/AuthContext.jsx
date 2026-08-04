/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { MEMBER_KEY, TOKEN_KEY } from "../api/axios";
import { authApi } from "../api/moiltae";

const AuthContext = createContext(null);

function readMember() {
  try {
    return JSON.parse(localStorage.getItem(MEMBER_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [member, setMember] = useState(() => {
    if (!localStorage.getItem(TOKEN_KEY)) return null;
    return readMember();
  });

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(MEMBER_KEY);
    setMember(null);
  };

  useEffect(() => {
    window.addEventListener("moiltae:unauthorized", logout);
    return () => window.removeEventListener("moiltae:unauthorized", logout);
  }, []);

  const login = async (credentials) => {
    const result = await authApi.login(credentials);
    localStorage.setItem(TOKEN_KEY, result.accessToken);
    localStorage.setItem(MEMBER_KEY, JSON.stringify(result.member));
    setMember(result.member);
    return result.member;
  };

  const value = useMemo(
    () => ({ member, isLoggedIn: Boolean(member), login, logout }),
    [member],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthProvider 안에서 useAuth를 사용해야 합니다.");
  return context;
}
