import { ReactNode } from 'react';
import { TanstackProvider } from '@/providers/query-provider';
import { AuthProvider } from './auth-provider';
import { AlertProvider } from '@/shared/hooks/use-alert';

/**
 * Componente que centraliza todos os providers da aplicação
 * Deve envolver o layout principal
 */

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <TanstackProvider>
      <AlertProvider>
        <AuthProvider>{children}</AuthProvider>
      </AlertProvider>
    </TanstackProvider>
  );
}
