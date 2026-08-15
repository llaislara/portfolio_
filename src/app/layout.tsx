// src/app/layout.tsx
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/providers/providers';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boilerplate',
  description: 'Código padrão conectado ao microsserviço FESF SUS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
