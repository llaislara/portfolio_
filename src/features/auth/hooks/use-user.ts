// src/features/auth/hooks/use-user.ts

import { useAuth } from '@/features/auth/hooks/use-auth';
import { Module, Role, UserUtils } from '@/shared/schemas/user-schemas';

/**
 * Hook que fornece utilidades avançadas para trabalhar com dados do usuário
 */
export function useUser() {
  const { user } = useAuth();

  return {
    user,

    // Dados básicos
    id: user?.id,
    email: user?.email,
    cpf: user?.cpf,
    isActive: user ? user.is_active : false,

    // Informações de módulo e papel atual
    currentModule: user?.current_module,
    currentRole: user?.current_role,

    // Funções de utilidade
    hasRole: (roleName: string): boolean => {
      return user ? UserUtils.hasRole(user, roleName) : false;
    },

    hasModule: (module_id: number): boolean => {
      return user ? UserUtils.hasModule(user, module_id) : false;
    },

    getAvailableRoles: (module_id?: number): Role[] => {
      return user ? UserUtils.getAvailableRoles(user, module_id) : [];
    },

    getAvailableModules: (): Module[] => {
      return user?.available_modules || [];
    },

    canChangeRole: (role_id: number): boolean => {
      if (!user?.current_module) return false;
      return (
        user.available_modules
          .find((m) => m.id === user.current_module?.id)
          ?.roles.some((r) => r.id === role_id) || false
      );
    },
  };
}
