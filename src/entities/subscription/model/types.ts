import { prisma } from '@/shared/lib/prisma';

/**
 * Сырая сущность из БД.
 */

export type DbSubscription = NonNullable<
  Awaited<ReturnType<typeof prisma.subscription.findUnique>>
>;

/**
 * Доменная сущность подписки, как ты её используешь в приложении.
 * Сейчас совпадает с DbSubscription, но можно будет добавить
 * вычисляемые поля (месячная стоимость, просрочена ли и тд).
 */
export type Subscription = DbSubscription;

export type BillingPeriod = DbSubscription['billingPeriod'];

/**
 * Пэйлоад для создания подписки (из формы/фичи).
 * Здесь уже не id/createdAt, а только то, что вводит юзер.
 */
export type SubscriptionCreateInput = {
  name: string;
  priceCents: number;
  currency: string;
  billingPeriod: BillingPeriod;
  billingInterval: number;
  nextChargeDate: Date;
  category?: string | null;
};

/**
 * Пэйлоад для обновления подписки.
 */
export type SubscriptionUpdateInput = Partial<SubscriptionCreateInput>;
