'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function TokenRedirector() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      document.cookie = `authToken=${accessToken}; path=/;`;
      localStorage.setItem('authToken', accessToken);
      setTimeout(() => {
        router.push('/auth');
      }, 0.01);
    } else {
      router.push('/no-auth');
    }
  }, [router, searchParams]);

  return null;
}
