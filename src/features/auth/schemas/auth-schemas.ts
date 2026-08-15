//src/features/auth/schemas/auth-schemas.ts

import { z } from 'zod';
import { ModuleSchema, RoleSchema, ModuleWithRolesSchema } from '@/shared/schemas/user-schemas';

/**
 * Schema para resposta do login
 */
export const loginResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  requires_role_selection: z.boolean(),
  requires_password_change: z.boolean().optional(),
  requires_email_confirmation: z.boolean().optional(),
  message: z.string().optional(),
  current_module: ModuleSchema.nullable(),
  current_role: RoleSchema.nullable(),
  available_modules: z.array(ModuleWithRolesSchema),
});

export type LoginResponse = z.infer<typeof loginResponseSchema>;

/**
 * Schema para requisição de seleção de módulo/perfil
 */
export const selectRoleRequestSchema = z.object({
  module_id: z.number(),
  role_id: z.number(),
});

export type SelectRoleRequest = {
  module_id: number;
  role_id: number;
};
