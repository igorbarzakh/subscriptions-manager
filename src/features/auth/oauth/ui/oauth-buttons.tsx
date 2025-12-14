'use client';

import { Button } from '@/shared/ui/button';
import { signIn } from 'next-auth/react';

export function OAuthButtons() {
  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => signIn('google', { callbackUrl: '/' })}>
        Войти через Google
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => signIn('github', { callbackUrl: '/' })}>
        Войти через GitHub
      </Button>
    </div>
  );
}
