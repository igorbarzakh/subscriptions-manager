import { prisma } from '@/shared/lib/prisma';

export async function listSubscriptionsByUserId(userId: string) {
  return prisma.subscription.findMany({
    where: { userId },
    orderBy: { nextChargeDate: 'asc' },
  });
}
