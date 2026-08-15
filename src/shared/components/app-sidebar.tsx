// src/shared/components/app-sidebar.tsx

'use client';

import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import logo_ppe from '../../../public/assets/images/logo_ppe.png';
import { RouteConfig, routes } from '@/shared/config/route-config';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLogout } from '@/features/auth/api/mutations';
import { useRouter } from 'next/navigation';
import { useSonner } from '@/shared/hooks/use-sonner';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { Circle, LogOut } from 'lucide-react';
import { ChangeRoleUser } from '@/features/auth/components/change-role-user';

export function AppSidebar() {
  const { user, isLoading } = useAuthStore();
  const pathname = usePathname();
  const { toast } = useSonner();
  const router = useRouter();
  const logoutMutation = useLogout();
  const { state } = useSidebar();

  if (isLoading || !user) {
    return null;
  }

  const hasPermission = (route: RouteConfig) => {
    if (!route.requiredPermissions && !route.requiredRoles) return true;
    // Verifica roles
    if (route.requiredRoles && route.requiredRoles.length > 0) {
      if (!user.current_role || !route.requiredRoles.includes(user.current_role.name)) {
        return false;
      }
    }
    // Verifica permissions
    if (route.requiredPermissions && route.requiredPermissions.length > 0) {
      const userPermissions = [
        ...(user.direct_permissions?.map((p) => (typeof p === 'string' ? p : p.name)) || []),
        ...(user.groups?.flatMap((g) =>
          g.permissions?.map((p: { name: unknown }) => (typeof p === 'string' ? p : p.name))
        ) || []),
      ];
      if (!route.requiredPermissions.every((perm) => userPermissions.includes(perm))) {
        return false;
      }
    }
    return true;
  };

  const handleGo = () => {
    router.push('/dashboard');
  };

  const renderMenuItems = (items: RouteConfig[]) => {
    return items
      .filter((item) => item.showInSidebar !== false)
      .filter(hasPermission)
      .map((item) => (
        <SidebarMenuItem
          key={item.path}
          className={`list-none overflow-x-hidden rounded-md [&>a]:pl-0 ${pathname === item.path ? 'active' : ''}`}
        >
          <Link
            href={item.path}
            className="flex w-full appearance-none items-center outline-none focus:outline-none"
          >
            <SidebarMenuButton isActive={pathname === item.path} className="w-full justify-start">
              {item.icon && <item.icon className="size-4" />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ));
  };

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push('localhost:3000');
      },
      onError: () => {
        toast({
          variant: 'destructive',
          title: 'Erro ao sair',
          description: 'Ocorreu um erro ao tentar sair. Tente novamente.',
        });
      },
    });
  };

  return (
    <Sidebar>
      <SidebarHeader>
        {state === 'collapsed' ? (
          <div
            className="flex w-full cursor-pointer items-center justify-center text-center"
            onClick={handleGo}
          >
            <span className="from-secondary to-primary list-none overflow-x-hidden !rounded !rounded-full !bg-gradient-to-r text-center [&>a]:pl-0">
              <Circle className="text-transparent" />{' '}
            </span>
          </div>
        ) : (
          <div
            onClick={handleGo}
            className="flex w-full cursor-pointer items-center justify-center p-6 pl-2"
          >
            <Image src={logo_ppe} alt="Logo PPE" className="w-full" quality={100} priority />
          </div>
        )}
      </SidebarHeader>

      <hr className="p-2" />

      <SidebarContent className="px-2 !text-sm">{renderMenuItems(routes)}</SidebarContent>

      <SidebarFooter>
        <ChangeRoleUser />
        <hr />

        <SidebarMenuButton onClick={handleLogout} className="hover:!bg-accent/20">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
