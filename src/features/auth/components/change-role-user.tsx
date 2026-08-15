// src/features/auth/components/user-info-panel.tsx

'use client';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { useSelectRole } from '@/features/auth/api/mutations';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/shared/components/ui/sidebar';
import { getDisplayRoleName } from '@/shared/utils/role-name-map';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronUp, Settings, UserRound, Circle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ChangeRoleUser() {
  const { user } = useAuth();
  const selectRole = useSelectRole();
  const [isChangingRole, setIsChangingRole] = useState(false);

  const currentModule = user?.current_module;
  const currentRole = user?.current_role;

  const currentModuleRoles =
    user?.available_modules.find((module) => module.id === currentModule?.id)?.roles || [];

  const handleChangeRole = async (role_id: number) => {
    if (!currentModule?.id) return;

    setIsChangingRole(true);
    selectRole.mutate(
      { module_id: currentModule.id, role_id: role_id },
      {
        onSuccess: () => {
          toast.success('Perfil alterado com sucesso!');
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : 'Erro desconhecido ao alterar perfil';
          toast.error(message);
        },
        onSettled: () => {
          setIsChangingRole(false);
        },
      }
    );
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8">
      <SidebarMenu>
        <SidebarMenuItem className="list-none">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="hover:bg-accent/20 flex w-full justify-between">
                <div className="flex flex-row gap-4">
                  <Settings className="h-4 w-4" /> Configurações{' '}
                </div>
                <ChevronUp className="h-4 w-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-sidebar-ring mb-2 flex w-[15rem] flex-col rounded-xl p-2 !text-sm shadow-md">
              <DropdownMenuItem className="flex flex-row items-center gap-1 rounded-md px-2 py-2">
                <UserRound className="size-4" />
                <span>{user?.name}</span>
              </DropdownMenuItem>

              <hr className="border-card-foreground/20 my-1" />

              {/* Perfil Atual */}
              <DropdownMenuItem className="flex cursor-default flex-row items-center gap-2 rounded-md px-2 py-2">
                <span className="font-medium">Perfil Atual</span>
              </DropdownMenuItem>

              {currentRole && (
                <DropdownMenuItem className="flex cursor-default items-center justify-start gap-2 rounded-md px-4 py-2">
                  <Circle className="bg-primary text-card-foreground size-3 rounded-full" />
                  <span>{getDisplayRoleName(currentRole.name)}</span>
                </DropdownMenuItem>
              )}
              <hr className="border-card-foreground/20 my-1" />

              {/* Lista de perfis disponíveis no módulo atual (exceto o atual) */}
              {currentModuleRoles.length > 1 && (
                <>
                  <DropdownMenuItem className="flex cursor-default flex-row items-center gap-2 rounded-md px-2 py-2">
                    <span className="font-medium">Trocar Perfil</span>
                  </DropdownMenuItem>

                  {currentModuleRoles
                    .filter((role) => role.id !== currentRole?.id)
                    .map((role) => (
                      <DropdownMenuItem
                        key={role.id}
                        className="hover:bg-accent/20 flex cursor-pointer items-center justify-between rounded-md px-4 py-2"
                        onClick={() => handleChangeRole(role.id)}
                        disabled={isChangingRole}
                      >
                        <span>{getDisplayRoleName(role.name)}</span>
                      </DropdownMenuItem>
                    ))}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  );
}
