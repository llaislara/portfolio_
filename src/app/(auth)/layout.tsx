// src/app/(auth)/layout.tsx

'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
