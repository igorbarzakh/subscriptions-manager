import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Badge } from '@/shared/ui/badge';

const mockStats = {
  perMonth: 34.98,
  perYear: 419.76,
  count: 3,
};

export function Dashboard() {
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
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>В месяц</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">€{mockStats.perMonth}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>В год</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">€{mockStats.perYear}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Подписок</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{mockStats.count}</div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Активные подписки</CardTitle>
            <Badge variant="secondary">мок</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">Здесь скоро будет список подписок</p>
        </CardContent>
      </Card>
    </main>
  );
}
