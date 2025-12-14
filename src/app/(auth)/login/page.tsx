import { Card } from '@/shared/ui/card';
import { OAuthButtons } from '@/features/auth/oauth/ui/oauth-buttons';
import { LoginForm } from '@/features/auth/login/ui/login-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Вход</h1>
          <p className="text-sm text-slate-500">Email/пароль или через провайдера</p>
        </div>

        <LoginForm />

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-500">или</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <OAuthButtons />
      </Card>
    </div>
  );
}
