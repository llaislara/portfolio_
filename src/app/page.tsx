import Image from 'next/image';
import { Suspense } from 'react';
import { Spinner } from '@/shared/components/spinner';
import { TokenRedirector } from '@/features/auth/components/token-redirector';

import bg_portal_fesf from '@/../public/assets/images/portal_fesf_bg.png';
import fesf_logo_white from '@/../public/assets/images/fesf_logo_white.png';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="fixed inset-0 -z-10">
        <Image
          src={bg_portal_fesf}
          alt="Background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
        />
      </div>

      <div className="absolute top-8 left-8 hidden md:block">
        <Image
          src={fesf_logo_white}
          alt="Logo"
          width={150}
          height={60}
          className="opacity-75"
          quality={100}
        />
      </div>

      <div className="flex !min-h-screen flex-col items-center justify-center gap-6 text-white">
        <h1 className="text-2xl font-semibold">Redirecionando para o sistema</h1>
        <div>
          <Spinner variant="light" />
        </div>
      </div>

      <Suspense fallback={null}>
        <TokenRedirector />
      </Suspense>
    </div>
  );
}
