import { z } from 'zod';

export const RoleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  hierarchy_level: z.number(),
});

export const ModuleSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  system_url: z.string(),
  roles: z.array(RoleSchema).optional(),
});

export const changeRoleResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  name: z.string(),
  requires_password_change: z.boolean(),
  requires_email_confirmation: z.boolean(),
  message: z.string().optional(),
  current_module: ModuleSchema,
  current_role: RoleSchema,
  available_modules: z.array(ModuleSchema),
});

export type Role = z.infer<typeof RoleSchema>;
export type Module = z.infer<typeof ModuleSchema>;
export type ChangeRoleResponse = z.infer<typeof changeRoleResponseSchema>;

export type SelectRoleRequest = {
  module_id: number;
  role_id: number;
};
