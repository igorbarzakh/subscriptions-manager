import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/auth';
import { Header } from '@/widgets/header/ui/header';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Separator } from '@/shared/ui/separator';

const FEATURES = [
  {
    title: 'Расходы по месяцам и годам',
    desc: 'Сводка по подпискам в одном месте: сколько уходит и на что.',
  },
  {
    title: 'Ближайшие списания',
    desc: 'Список ближайших платежей, чтобы никаких “ой, опять списали”.',
  },
  {
    title: 'Категории и порядок',
    desc: 'Разделяй подписки по типам: развлечения, работа, здоровье и т.д.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Добавь подписку',
    desc: 'Название, цена, период и дата следующего платежа.',
  },
  {
    step: '02',
    title: 'Смотри сводку',
    desc: 'Месячные/годовые расходы и ближайшие списания.',
  },
  {
    step: '03',
    title: 'Оптимизируй',
    desc: 'Находи лишнее и принимай решение — отключить или оставить.',
  },
];

const FAQ = [
  {
    q: 'Зачем мне это, если я и так примерно знаю свои подписки?',
    a: 'Пока подписок мало — да. Но когда их становится больше 5–7, начинаются сюрпризы. Приложение даёт чёткую картину без необходимости держать всё в голове.',
  },
  {
    q: 'Это не превратится в ещё одну задачу, за которой нужно следить?',
    a: 'Нет. Ты просто добавляешь подписки — дальше приложение работает как обзор, а не как система напоминаний и дедлайнов.',
  },
  {
    q: 'Мне будут что-то навязывать или продавать?',
    a: 'Нет. Сервис полностью бесплатный. Никакой рекламы, рекомендаций или партнёрских ссылок.',
  },
  {
    q: 'Мои данные никуда не уйдут?',
    a: 'Нет. Данные видишь только ты после авторизации. Мы не используем их для аналитики или маркетинга.',
  },
  {
    q: 'Если перестану пользоваться — что с данными?',
    a: 'Ты всегда можешь удалить аккаунт и данные. Никакой привязки и “ловушек”.',
  },
];

function RouteButton({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Link className="hover:text-slate-900 block" href={isLoggedIn ? '/dashboard' : '/login'}>
      <Button size="lg" className="w-full sm:w-auto">
        {isLoggedIn ? 'Перейти в панель' : 'Начать'}
      </Button>
    </Link>
  );
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto max-w-6xl px-4">
        <section className="pt-14 sm:pt-20 pb-10 sm:pb-14">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="text-sm text-slate-600">Доступно бесплатно</span>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
                Управляй подписками
                <br />в одном месте
              </h1>

              <p className="max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed">
                Один список. Чёткая картина. Полный контроль
              </p>

              <RouteButton isLoggedIn={!!session?.user} />

              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <Link href="/login"></Link>
              </div>
            </div>

            <div className="lg:pl-8">
              <Card className="p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">Сводка</div>
                    <div className="mt-1 text-2xl font-semibold">€ 24.90 / мес</div>
                  </div>
                  <Badge variant="outline" className="rounded-full">
                    6 подписок
                  </Badge>
                </div>

                <Separator className="my-5" />

                <div className="space-y-3">
                  {[
                    { name: 'Spotify', date: '15 янв', price: '€ 5.99' },
                    { name: 'Netflix', date: '19 янв', price: '€ 10.99' },
                    { name: 'Notion', date: '25 янв', price: '€ 7.92' },
                  ].map((x) => (
                    <div key={x.name} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{x.name}</div>
                        <div className="text-xs text-slate-500">Списание: {x.date}</div>
                      </div>
                      <div className="text-sm font-semibold">{x.price}</div>
                    </div>
                  ))}
                </div>

                <Separator className="my-5" />

                <div className="grid grid-cols-3 gap-3">
                  <Card className="p-3">
                    <div className="text-xs text-slate-500">В месяц</div>
                    <div className="mt-1 text-sm font-semibold">€ 24.90</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-xs text-slate-500">В год</div>
                    <div className="mt-1 text-sm font-semibold">€ 298.80</div>
                  </Card>
                  <Card className="p-3">
                    <div className="text-xs text-slate-500">Ближайшая</div>
                    <div className="mt-1 text-sm font-semibold">15 янв</div>
                  </Card>
                </div>
              </Card>

              <p className="mt-3 text-xs text-slate-500">
                Все данные вымышлены и служат только для демонстрации интерфейса.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Что даёт приложение
              </h2>
              <p className="text-slate-600 max-w-2xl">
                Сфокусировано на главном: контроль расходов и прозрачность списаний
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FEATURES.map((f) => (
              <Card key={f.title} className="p-6">
                <div className="text-sm font-semibold">{f.title}</div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <Card className="p-6 sm:p-8">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                Как это работает
              </h2>
              <p className="text-slate-600 max-w-2xl">
                Три шага — и ты уже видишь картину расходов
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {HOW_IT_WORKS.map((x) => (
                <div key={x.step} className="rounded-xl border border-slate-200 bg-white p-5">
                  <div className="text-xs text-slate-500">{x.step}</div>
                  <div className="mt-2 text-sm font-semibold">{x.title}</div>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{x.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <RouteButton isLoggedIn={!!session?.user} />
            </div>
          </Card>
        </section>

        <section className="py-10 sm:py-14">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">FAQ</h2>
            <p className="text-slate-600 max-w-2xl">Короткие ответы на частые вопросы</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {FAQ.map((x) => (
              <Card key={x.q} className="p-6">
                <div className="text-sm font-semibold">{x.q}</div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{x.a}</p>
              </Card>
            ))}
          </div>
        </section>

        <footer className="pb-10 sm:pb-12">
          <Separator className="mb-6" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-slate-500">
            <div>© {new Date().getFullYear()} Subscriptions Manager</div>
            <p className="text-slate-500">All rights reserved</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
