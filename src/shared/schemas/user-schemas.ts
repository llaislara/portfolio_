//src/shared/schemas/user-schemas.ts

import { z } from 'zod';

/**
 * Schema para módulo do sistema
 */
export const ModuleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

/**
 * Schema para papel/role do usuário
 */
export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
});

/**
 * Schema para módulo com seus papéis/roles disponíveis
 */
export const ModuleWithRolesSchema = z.object({
  id: z.number(),
  name: z.string(),
  roles: z.array(RoleSchema),
});

/**
 * Schema para grupo de usuários
 * Mantido genérico até termos mais detalhes da API
 */
export const GroupSchema = z.record(z.any());

/**
 * Schema para permissão de usuário
 * Atualizado conforme resposta real da API
 */
export const PermissionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  details: z.object({
    type: z.string(),
    action: z.string(),
    resource: z.string(),
  }),
  modules: z.array(ModuleSchema),
});

/**
 * Schema principal do usuário conforme retornado pela API /me
 */
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(), // ← esta linha precisa estar presente
  email: z.string().email(),
  cpf: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  is_active: z.boolean(),
  requires_password_change: z.boolean().optional(),
  requires_email_confirmation: z.boolean().optional(),
  current_module: z
    .object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      system_url: z.string(),
    })
    .nullable(),
  current_role: z
    .object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      hierarchy_level: z.number(),
    })
    .nullable(),
  groups: z.array(z.record(z.any())),
  direct_permissions: z.array(z.record(z.any())),
  available_modules: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      description: z.string(),
      system_url: z.string(),
      roles: z.array(
        z.object({
          id: z.number(),
          name: z.string(),
          description: z.string(),
          hierarchy_level: z.number(),
        })
      ),
    })
  ),
});

// Types gerados a partir dos schemas
export type User = z.infer<typeof UserSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type Role = z.infer<typeof RoleSchema>;
export type ModuleWithRoles = z.infer<typeof ModuleWithRolesSchema>;
export type Group = z.infer<typeof GroupSchema>;
export type Permission = z.infer<typeof PermissionSchema>;

/**
 * Funções de utilidade para verificações de autorização
 */
export const UserUtils = {
  /**
   * Verifica se o usuário tem um determinado papel
   */
  hasRole: (user: User, roleName: string): boolean => {
    return user.current_role?.name === roleName;
  },

  /**
   * Verifica se o usuário tem acesso a um módulo específico
   */
  hasModule: (user: User, module_id: number): boolean => {
    return user.available_modules.some((module) => module.id === module_id);
  },

  /**
   * Retorna todos os papéis disponíveis para o usuário no módulo atual
   */
  getAvailableRoles: (user: User, module_id?: number): Role[] => {
    const targetModuleId = module_id ?? user.current_module?.id;
    if (!targetModuleId) return [];

    const foundModule = user.available_modules.find((m) => m.id === targetModuleId);
    return foundModule?.roles || [];
  },

  /**
   * Verifica se o usuário está ativo
   */
  isActive: (user: User): boolean => {
    return user.is_active;
  },

  /**
   * Verifica se o usuário tem uma permissão específica
   */
  hasPermission: (user: User, permissionName: string): boolean => {
    return user.direct_permissions.some((permission) => permission.name === permissionName);
  },

  /**
   * Verifica se o usuário tem todas as permissões especificadas
   */
  hasAllPermissions: (user: User, permissionNames: string[]): boolean => {
    return permissionNames.every((name) =>
      user.direct_permissions.some((permission) => permission.name === name)
    );
  },

  /**
   * Verifica se o usuário tem pelo menos uma das permissões especificadas
   */
  hasAnyPermission: (user: User, permissionNames: string[]): boolean => {
    return permissionNames.some((name) =>
      user.direct_permissions.some((permission) => permission.name === name)
    );
  },
};
