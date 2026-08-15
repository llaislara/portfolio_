// src/features/auth/api/mutations.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiClient } from '@/shared/lib/api-client';
import { AUTH_ENDPOINTS } from '@/features/auth/api/endpoints';
import { AuthQueryKeys } from '@/features/auth/api/queries';
import {
  // LoginRequest,
  SelectRoleRequest,
} from '@/features/auth/schemas/auth-schemas';
import { ChangeRoleResponse, changeRoleResponseSchema } from '@/features/auth/schemas/role-schemas';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { toast } from 'sonner';
import { formatRoleName } from '@/shared/utils/role-name-map';
import { useRouter } from 'next/navigation';

export function useForgotPassword() {
  const httpClient = ApiClient.getInstance().getHttpClient();

  return useMutation({
    mutationFn: async (email: string) => {
      return await httpClient.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, {
        email,
      });
    },
    onError: (error: any) => {
      // Handle any specific error transformations here if needed
      console.error('Password reset request failed:', error);
      return (
        error.response?.data || { message: 'Erro ao processar a solicitação de reset de senha.' }
      );
    },
  });
}

/**
 * Hook para seleção de módulo e perfil
 */
export function useSelectRole() {
  const queryClient = useQueryClient();
  const { setAuthInfo, setLoading } = useAuthStore();
  const httpClient = ApiClient.getInstance().getHttpClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ module_id, role_id }: SelectRoleRequest) => {
      setLoading(true);

      const response = await httpClient.post<ChangeRoleResponse>(AUTH_ENDPOINTS.SELECT_ROLE, {
        module_id,
        role_id,
      });

      const parsed = changeRoleResponseSchema.parse(response);

      if (parsed.access_token) {
        document.cookie = `authToken=${parsed.access_token}; path=/; max-age=86400; SameSite=Strict`;
      }

      return parsed;
    },
    onSuccess: (data) => {
      const currentAuth = useAuthStore.getState().authInfo;

      setAuthInfo({
        ...currentAuth,
        access_token: data.access_token,
        token_type: data.token_type,
        current_module: data.current_module,
        current_role: data.current_role,
        requires_role_selection: false,
        available_modules: currentAuth?.available_modules ?? [],
      });

      toast.success('Perfil alterado com sucesso!', {
        description: `${formatRoleName(data.current_role.description)}`,
      });

      queryClient.invalidateQueries({ queryKey: AuthQueryKeys.currentUser });
      router.push('/dashboard');
    },
    onError: (error) => {
      toast.error('Erro ao trocar de perfil', {
        description: error instanceof Error ? error.message : 'Ocorreu um erro inesperado.',
      });
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

/**
 * Hook para logout de usuário
 */
export function useLogout() {
  const queryClient = useQueryClient();
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    },
    onSuccess: () => {
      clearUser();
      queryClient.invalidateQueries({ queryKey: AuthQueryKeys.currentUser });
    },
  });
}
