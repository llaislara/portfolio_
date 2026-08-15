// src/features/auth/store/auth-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/shared/schemas/user-schemas';
import { LoginResponse } from '../schemas/auth-schemas';

interface AuthState {
  user: User | null;
  authInfo: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  currentRole: string | null;

  // Actions
  setUser: (user: User | null) => void;
  setAuthInfo: (authInfo: LoginResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setCurrentRole: (role: string | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      authInfo: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      currentRole: null,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
          currentRole: user?.current_role?.name || null,
        }),
      setAuthInfo: (authInfo) => set({ authInfo, isAuthenticated: true }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setCurrentRole: (currentRole) => set({ currentRole }),
      clearUser: () =>
        set({
          user: null,
          authInfo: null,
          isAuthenticated: false,
          currentRole: null,
        }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        authInfo: state.authInfo,
        currentRole: state.currentRole,
      }),
      skipHydration: true,
    }
  )
);
