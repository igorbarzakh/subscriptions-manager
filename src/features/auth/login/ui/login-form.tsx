'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    setPending(false);

    if (res?.error) {
      setError('Неверный email или пароль');
      return;
    }

    window.location.href = res?.url ?? '/';
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button className="w-full" disabled={pending}>
        {pending ? 'Входим...' : 'Войти'}
      </Button>

      <p className="text-center text-sm text-slate-600">
        Нет аккаунта?{' '}
        <Link href="/register" className="underline">
          Регистрация
        </Link>
      </p>
    </form>
  );
}
