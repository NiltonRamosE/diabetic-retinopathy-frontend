import { useState, useEffect } from 'react';
import { set } from 'zod';

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [role, setRole] = useState<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = window.localStorage.getItem("token");
    const uStr = window.localStorage.getItem("user");
    const pStr = window.localStorage.getItem("profile");
    const r = window.localStorage.getItem("role");
    
    let parsedUser: any = null;
    let parsedProfile: any = null;
    try { 
      parsedUser = uStr ? JSON.parse(uStr) : null;
      parsedProfile = pStr ? JSON.parse(pStr) : null;
    } catch {
      parsedUser = null;
      parsedProfile = null;
    }
    if (parsedUser && Array.isArray(parsedUser.roles) && parsedUser.roles.length > 0) {
      localStorage.setItem("role", parsedUser.roles[0]);
    }
    setToken(t ?? null);
    setUser(parsedUser);
    setProfile(parsedProfile);
    setRole(r ?? null);
    setMounted(true);
  }, []);

  return { token, user, profile, role, mounted };
}