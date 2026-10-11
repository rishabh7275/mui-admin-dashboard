import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

const AuthContext = createContext(null);

const DEFAULT_PROFILE = {
  fullName: "Rishabh Tiwari",
  email: "rishabh@example.com",
  role: "Administrator",
  phone: "+91 98765 43210",
  department: "Product & Engineering",
  bio: "Lead Systems Administrator managing core infrastructure, analytics, and business operations.",
  location: "New Delhi, India",
  avatarUrl: "",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profile data state with localStorage persistence
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("mui_admin_profile");
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch (e) {
      console.warn("Failed to parse saved profile", e);
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (!error && data?.session) {
            if (mounted) {
              setSession(data.session);
              setUser(data.session.user);
              if (data.session.user?.user_metadata) {
                setProfile((prev) => ({
                  ...prev,
                  fullName: data.session.user.user_metadata.full_name || prev.fullName,
                  email: data.session.user.email || prev.email,
                  role: data.session.user.user_metadata.role || prev.role,
                }));
              }
            }
          }
        } catch (err) {
          console.warn("Supabase auth check failed:", err);
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
          if (mounted) {
            setSession(currentSession);
            setUser(currentSession?.user || null);
            if (currentSession?.user) {
              setProfile((prev) => ({
                ...prev,
                email: currentSession.user.email || prev.email,
                fullName: currentSession.user.user_metadata?.full_name || prev.fullName,
              }));
            }
          }
        });

        if (mounted) setLoading(false);
        return () => {
          mounted = false;
          authListener?.subscription?.unsubscribe();
        };
      } else {
        // Fallback / Demo session check in localStorage
        try {
          const storedAuth = localStorage.getItem("mui_admin_auth");
          if (storedAuth) {
            const parsed = JSON.parse(storedAuth);
            setUser(parsed.user);
            setSession(parsed.session);
          }
        } catch (e) {
          console.warn("Failed to restore demo session", e);
        }
        if (mounted) setLoading(false);
      }
    }

    initializeAuth();
  }, []);

  // Update profile
  const updateProfile = async (newProfileData) => {
    const updated = { ...profile, ...newProfileData };
    setProfile(updated);
    try {
      localStorage.setItem("mui_admin_profile", JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save profile to localStorage", e);
    }

    // If Supabase user exists, sync metadata
    if (isSupabaseConfigured && supabase && user) {
      try {
        await supabase.auth.updateUser({
          data: {
            full_name: updated.fullName,
            role: updated.role,
            phone: updated.phone,
            department: updated.department,
            bio: updated.bio,
            location: updated.location,
          },
        });
      } catch (e) {
        console.warn("Supabase metadata sync failed:", e);
      }
    }
    return updated;
  };

  // Sign In
  const signIn = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setSession(data.session);
      setUser(data.user);
      return data;
    } else {
      // Demo authentication mode
      const mockUser = {
        id: "demo-user-101",
        email: email || "rishabh@example.com",
        user_metadata: {
          full_name: profile.fullName || "Rishabh Tiwari",
          role: "Administrator",
        },
      };
      const mockSession = {
        access_token: "demo-token-" + Date.now(),
        user: mockUser,
      };
      setUser(mockUser);
      setSession(mockSession);
      localStorage.setItem(
        "mui_admin_auth",
        JSON.stringify({ user: mockUser, session: mockSession })
      );
      return { user: mockUser, session: mockSession };
    }
  };

  // Sign Up
  const signUp = async (email, password, fullName = "New User") => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: "Administrator",
          },
        },
      });
      if (error) throw error;
      if (data?.session) {
        setSession(data.session);
        setUser(data.user);
      }
      return data;
    } else {
      const mockUser = {
        id: "demo-user-" + Date.now(),
        email,
        user_metadata: { full_name: fullName, role: "Administrator" },
      };
      const mockSession = { access_token: "demo-token-" + Date.now(), user: mockUser };
      setUser(mockUser);
      setSession(mockSession);
      localStorage.setItem("mui_admin_auth", JSON.stringify({ user: mockUser, session: mockSession }));
      return { user: mockUser, session: mockSession };
    }
  };

  // Sign Out
  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn("Supabase sign out error:", e);
      }
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem("mui_admin_auth");
  };

  // Change password
  const changePassword = async (newPassword) => {
    if (isSupabaseConfigured && supabase && user) {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return data;
    }
    // In demo mode, simulate success
    return { success: true };
  };

  const value = {
    user,
    session,
    profile,
    loading,
    isSupabaseConfigured,
    signIn,
    signUp,
    signOut,
    updateProfile,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
