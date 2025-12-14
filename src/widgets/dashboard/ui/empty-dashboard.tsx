import Link from 'next/link';
import { Button } from '@/shared/ui/button';

export function EmptyDashboard() {
  return (
    <main className="mx-auto flex max-w-6xl px-4 pt-14">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Подписок пока нет</h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-600 leading-relaxed">
            Добавь первую подписку, чтобы начать вести учёт.
          </p>
        </div>

        <Button asChild size="lg">
          <Link href="/subscriptions/new">Добавить подписку</Link>
        </Button>
      </div>
    </main>
  );
}
