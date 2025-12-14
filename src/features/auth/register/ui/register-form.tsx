'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import Link from 'next/link';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name || undefined, email, password }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      setError(data?.error ?? 'Не удалось создать аккаунт');
      setPending(false);
      return;
    }

    const loginRes = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/',
    });

    setPending(false);

    if (loginRes?.error) {
      window.location.href = '/login';
      return;
    }

    window.location.href = loginRes?.url ?? '/';
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <Input
        type="text"
        placeholder="Имя (необязательно)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
      />
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
        autoComplete="new-password"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button className="w-full" disabled={pending}>
        {pending ? 'Создаем...' : 'Создать аккаунт'}
      </Button>

      <p className="text-center text-sm text-slate-600">
        Уже есть аккаунт?{' '}
        <Link href="/login" className="underline">
          Войти
        </Link>
      </p>
    </form>
  );
}
