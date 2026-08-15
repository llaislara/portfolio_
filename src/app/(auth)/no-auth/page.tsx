// src/app/(auth)/no-auth/page.tsx

'use client';

import Image from 'next/image';
import no_auth_bg from '@/../public/assets/images/no_auth_bg.png';
import fesf_logo_white from '@/../public/assets/images/fesf_logo_white.png';
import { Button } from '@/shared/components/ui/button';

export default function noAuthPage() {
  return (
    <div className="!min-w-screen">
      <div className="fixed inset-0 -z-10">
        <Image
          src={no_auth_bg}
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
      <div className="text-card flex !min-h-screen flex-col items-center justify-center gap-6 text-center">
        <h1 className="flex w-full justify-center text-4xl font-normal text-white/90">
          Ops! Parece que sua sessão expirou.
        </h1>
        <Button className="text-md text-secondary hover:bg-secondary flex !w-max cursor-pointer items-center justify-center rounded-full bg-white px-6 text-center font-semibold shadow-lg duration-300 ease-in hover:scale-110 hover:text-white">
          Clique aqui para acessar o Portal FESF
        </Button>
      </div>
    </div>
  );
}
