import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const AuthContext = createContext(null);

const DEFAULT_GUEST_USER = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'athlete@gymgenie.ai',
  user_metadata: {
    full_name: 'GymGenie Athlete'
  }
};

const DEFAULT_PROFILE = {
  id: '00000000-0000-0000-0000-000000000001',
  email: 'athlete@gymgenie.ai',
  full_name: 'GymGenie Athlete',
  age: 26,
  weight_kg: 76.5,
  height_cm: 178,
  gender: 'Male',
  experience_level: 'Intermediate',
  primary_goal: 'Hypertrophy',
  equipment_access: 'Full Gym',
  injuries_limitations: ''
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local storage for persistent guest / demo session
    const storedGuest = localStorage.getItem('gymgenie_guest_user');
    const storedProfile = localStorage.getItem('gymgenie_user_profile');

    if (storedProfile) {
      try {
        setProfile(JSON.parse(storedProfile));
      } catch (e) {}
    }

    if (isSupabaseConfigured()) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // In demo / fallback mode, auto-login guest if previously stored, else guest ready
      if (storedGuest) {
        setUser(JSON.parse(storedGuest));
      } else {
        // Pre-authenticate as default guest so user can immediately use all features
        setUser(DEFAULT_GUEST_USER);
        localStorage.setItem('gymgenie_guest_user', JSON.stringify(DEFAULT_GUEST_USER));
      }
      setLoading(false);
    }
  }, []);

  const signUp = async (email, password, fullName) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      if (error) throw error;
      return data;
    } else {
      const mockUser = {
        id: 'guest-' + Date.now(),
        email,
        user_metadata: { full_name: fullName }
      };
      setUser(mockUser);
      localStorage.setItem('gymgenie_guest_user', JSON.stringify(mockUser));
      return { user: mockUser };
    }
  };

  const signIn = async (email, password) => {
    if (isSupabaseConfigured()) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    } else {
      const mockUser = {
        id: '00000000-0000-0000-0000-000000000001',
        email,
        user_metadata: { full_name: 'GymGenie Athlete' }
      };
      setUser(mockUser);
      localStorage.setItem('gymgenie_guest_user', JSON.stringify(mockUser));
      return { user: mockUser };
    }
  };

  const loginAsGuest = () => {
    setUser(DEFAULT_GUEST_USER);
    localStorage.setItem('gymgenie_guest_user', JSON.stringify(DEFAULT_GUEST_USER));
  };

  const signOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setSession(null);
    localStorage.removeItem('gymgenie_guest_user');
  };

  const updateProfileData = (updatedFields) => {
    const updated = { ...profile, ...updatedFields };
    setProfile(updated);
    localStorage.setItem('gymgenie_user_profile', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signUp,
        signIn,
        signOut,
        loginAsGuest,
        updateProfile: updateProfileData,
        isConfigured: isSupabaseConfigured()
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
