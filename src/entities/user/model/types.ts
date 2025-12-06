import { prisma } from '@/shared/lib/prisma';

/**
 * Как есть в БД.
 * Используем в репозиториях, сервисах, где нужен полный объект, включая passwordHash.
 */
export type DbUser = NonNullable<Awaited<ReturnType<typeof prisma.user.findUnique>>>;

/**
 * Пользователь, который может «выйти наружу» в UI/ответы API.
 * Никогда не отдаём passwordHash.
 */
export type SafeUser = Omit<DbUser, 'passwordHash'>;

/**
 * Пользователь, с которым ты обычно работаешь в приложении после авторизации.
 * Минимальный набор, без всего лишнего.
 */
export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
};

/**
 * Если хочешь тип, включающий подписки (entities/subscription),
 * можно будет добавить потом через Prisma.UserGetPayload,
 * когда появятся репозитории с include.
 */
