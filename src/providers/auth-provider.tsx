'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/shared/lib/api-client';
import { User } from '@/shared/schemas/user-schemas';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, setUser, setLoading, setCurrentRole } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Só busca se não houver usuário
    if (user) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const client = ApiClient.getInstance().getHttpClient();
        const response = await client.get<User>('/auth/me');
        setUser(response);
        setCurrentRole(response.current_role?.name || null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
        setCurrentRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, setUser, setLoading, setCurrentRole, queryClient]);

  return <>{children}</>;
}
