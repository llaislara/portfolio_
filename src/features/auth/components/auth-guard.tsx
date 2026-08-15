'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/store/auth-store';
import { routes } from '@/shared/config/route-config';
import { verifyPermissions } from '@/shared/lib/auth/permissions';
import { useAlert } from '@/shared/hooks/use-alert';
import { Loader2 } from 'lucide-react';

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuthStore();
  const { showMessage } = useAlert();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (isLoading || !user || !pathname) {
      return;
    }

    const currentRoute = findRouteConfig(pathname);

    if (!currentRoute) {
      setAuthorized(true);
      return;
    }

    if (!user) {
      router.push(`/auth?callbackUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    const hasPermission = verifyPermissions({
      user,
      requiredRoles: currentRoute.requiredRoles || [],
      requiredPermissions: currentRoute.requiredPermissions || [],
      requiredModules: currentRoute.requiredModules || [],
      strictMode: true,
    });

    if (!hasPermission) {
      showMessage('Acesso Negado', 'Você não tem permissão para acessar esta página.');
      router.push('/dashboard');
      return;
    }

    setAuthorized(true);
  }, [pathname, router, user, isLoading, showMessage]);

  function findRouteConfig(pathname: string) {
    const route = routes.find((r) => r.path === pathname);
    if (route) return route;

    for (const parentRoute of routes) {
      if (parentRoute.children) {
        const childRoute = parentRoute.children.find((r) => r.path === pathname);
        if (childRoute) return childRoute;
      }
    }

    return undefined;
  }

  if (authorized === null) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="flex h-[calc(100vh-64px)] items-center justify-center">
        <p>Você não tem permissão para acessar esta página</p>
      </div>
    );
  }

  return <>{children}</>;
}
