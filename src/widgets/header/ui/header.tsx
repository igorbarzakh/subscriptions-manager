import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import Logo from '@/shared/assets/logo.svg';
import { getCurrentUser } from '@/entities/user/lib/get-current-user';
import { UserMenu } from '@/entities/user/ui/user-menu';

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          <Logo width={128} height={30} />
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link href="/login">
              <Button variant="outline">Войти</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
