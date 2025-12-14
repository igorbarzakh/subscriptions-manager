import { getServerSession } from 'next-auth';
import { authOptions } from '@/shared/lib/auth';
import type { AuthUser } from '@/entities/user/model/types';

export async function getCurrentUser(): Promise<AuthUser | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  return {
    id: session.user.id,
    email: session.user.email,
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  };
}
