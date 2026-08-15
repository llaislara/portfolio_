// src/app/(protected)/my-data/page.tsx

'use client';

import Documentation from '@/features/documentation/text';

import { useAuth } from '@/features/auth/hooks/use-auth';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const router = useRouter();
  const { user } = useAuth();

  const handleGoBack = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[2rem]"> Documentação - Boilerplate FrontEnd </h1>
        <p className="text-card-foreground/60 text-sm"> Olá, {user?.name}!</p>
      </div>
      <hr className="!border-card-foreground/25 mt-2 mb-4 rounded-full border-[.15rem]" />
      <Button variant="back_button" onClick={handleGoBack}>
        {' '}
        <ArrowLeft /> Voltar{' '}
      </Button>
      <Card>
        <Documentation />
      </Card>
    </div>
  );
}
