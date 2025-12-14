import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export function EmptyDashboard() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-6xl items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Подписок пока нет</h1>

        <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-600 leading-relaxed">
          Добавь первую подписку, чтобы начать вести учёт.
        </p>

        <div className="pt-2">
          <Button asChild size="lg">
            <Link href="/subscriptions/new">Добавить подписку</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
