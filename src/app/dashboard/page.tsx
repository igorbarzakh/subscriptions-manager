import { requireAuth } from '@/processes/auth-flow/lib/require-auth';
import { Header } from '@/widgets/header/ui/header';
import { Dashboard } from '@/widgets/dashboard/ui/dashboard';
import { listSubscriptionsByUserId } from '@/entities/subscription/lib/repo';

export default async function DashboardPage() {
  const session = await requireAuth();

  const userId = session.user.id;
  const subs = (await listSubscriptionsByUserId(userId)) || [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <Dashboard subs={subs} />
    </div>
  );
}
