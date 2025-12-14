import { Card } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { EmptyDashboard } from './empty-dashboard';

type Subscription = {
  id: string;
  name: string;
  priceCents: number;
  currency: string;
  nextChargeDate: Date;
};

function formatMoney(cents: number, currency: string) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

export function Dashboard({ subs = [] }: { subs: Subscription[] }) {
  if (subs.length === 0) return <EmptyDashboard />;

  const perMonthCents = subs.reduce((sum, s) => sum + s.priceCents, 0);
  const perYearCents = perMonthCents * 12;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Обзор</h1>
          <p className="text-sm text-slate-500">Текущие расходы по подпискам</p>
        </div>

        <Button>Добавить подписку</Button>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-xs text-slate-500">В месяц</div>
          <div className="mt-2 text-2xl font-semibold">{formatMoney(perMonthCents, 'EUR')}</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-slate-500">В год</div>
          <div className="mt-2 text-2xl font-semibold">{formatMoney(perYearCents, 'EUR')}</div>
        </Card>

        <Card className="p-4">
          <div className="text-xs text-slate-500">Подписок</div>
          <div className="mt-2 text-2xl font-semibold">{subs.length}</div>
        </Card>
      </section>

      <Card className="p-4">
        <div className="mb-3 text-sm font-semibold">Ближайшие платежи</div>
        {subs.length === 0 ? (
          <div className="text-sm text-slate-500">Пока нет подписок. Добавь первую 👇</div>
        ) : (
          <div className="space-y-2">
            {subs.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(s.nextChargeDate).toLocaleDateString('ru-RU')}
                  </div>
                </div>
                <div className="text-sm font-semibold">{formatMoney(s.priceCents, s.currency)}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
