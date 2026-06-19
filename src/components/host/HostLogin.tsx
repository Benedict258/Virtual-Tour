import { Globe, LogIn } from 'lucide-react';
import { type FormEvent, useState } from 'react';
import { useHostAuth } from './HostAuthContext';

export default function HostLogin() {
  const { login } = useHostAuth();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!email.trim()) {
        throw new Error('Please enter your email');
      }
      if (!passcode.trim()) {
        throw new Error('Please enter your passcode');
      }

      const success = await login(email.trim(), passcode.trim());
      if (!success) {
        throw new Error('Invalid email or passcode');
      }
    } catch (err) {
      console.error('Host login failed:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-border p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-coral flex items-center justify-center text-white">
            <Globe className="size-[18px]" />
          </div>
          <span className="font-bold text-lg text-dark">Lagos Rhythm</span>
          <span className="ml-auto text-xs font-bold uppercase tracking-widest text-muted-foreground">Host</span>
        </div>

        <form onSubmit={(e) => void handleSubmit(e)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Passcode</label>
            <input
              type="password"
              required
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal/50 transition-colors"
              placeholder="Enter host passcode"
            />
          </div>

          {error && (
            <p className="text-xs text-coral font-semibold bg-coral/5 border border-coral/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-coral text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-coral/90 transition-colors disabled:opacity-60"
          >
            <LogIn className="size-4" />
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
