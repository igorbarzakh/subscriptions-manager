import { Header } from '@/widgets/header/ui/header';
import { Dashboard } from '@/widgets/dashboard/ui/dashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <Dashboard />
    </div>
  );
}
