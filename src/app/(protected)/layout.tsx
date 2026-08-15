// src/app/(protected)/layout.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import { SidebarProvider, SidebarTrigger } from '@/shared/components/ui/sidebar';
import { AppSidebar } from '@/shared/components/app-sidebar';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import { ScrollToTopButton } from '@/shared/components/scroll-top';
import { RouteGuard } from '@/features/auth/components/auth-guard';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex-1">
            <div className="sticky top-0 z-10 flex h-16 items-center justify-between">
              <SidebarTrigger />
              <ThemeToggle />
            </div>
            <main className="p-4 md:px-22">
              <RouteGuard>{children}</RouteGuard>
            </main>
          </div>
        </div>
        <ScrollToTopButton />
      </SidebarProvider>
    </ThemeProvider>
  );
}
