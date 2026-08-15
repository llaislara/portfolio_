// src/app/(auth)/auth/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useCurrentUser } from '@/features/auth/api/queries';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const { data: user, isLoading, isError } = useCurrentUser();
  const router = useRouter();
  const [authorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!isLoading) {
      if (user && authorized) {
        router.push('/dashboard');
      } else if (user && !authorized) {
        router.push('/dashboard');
      } else if (isError) {
        router.push('/no-auth');
      }
    }
  }, [user, isLoading, isError, router, authorized]);

  return <div className="flex h-screen items-center justify-center"> </div>;
}
