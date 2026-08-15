import { NextRequest, NextResponse } from 'next/server';
import { routes, RouteConfig } from '@/shared/config/route-config';
import * as jwt from 'jsonwebtoken';

const PUBLIC_ROUTES = ['/auth', '/unauthorized', '/'];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Libera rotas públicas explicitamente
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const currentRoute = findRouteConfig(pathname);

  if (!currentRoute) {
    return NextResponse.next(); // não está definida como protegida
  }

  const authToken = request.cookies.get('authToken')?.value;

  if (!authToken) {
    return redirectToLogin(request, pathname);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('JWT_SECRET não definido');
    return redirectToLogin(request, pathname);
  }

  try {
    jwt.verify(authToken, secret);
    return NextResponse.next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return redirectToLogin(request, pathname);
  }
}

function redirectToLogin(request: NextRequest, pathname: string) {
  const loginUrl = new URL('/auth', request.url);
  loginUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(loginUrl);
}

function findRouteConfig(pathname: string): RouteConfig | undefined {
  const route = routes.find((r) => r.path === pathname);
  if (route) return route;

  for (const parentRoute of routes) {
    if (parentRoute.children) {
      const child = parentRoute.children.find((r) => r.path === pathname);
      if (child) return child;
    }
  }

  return undefined;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
