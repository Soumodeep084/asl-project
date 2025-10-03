import { currentUser } from '@clerk/nextjs/server';
import { getUserIdByClerkId } from '@/actions/UserActions';
import { getUserTransactions } from '@/actions/PaymentActions';
import SignInPrompt from '@/components/SignInPrompt';
import Link from 'next/link';

export const metadata = { title: 'Transactions | SilentTalk' };

function statusBadge(status) {
  const base = 'px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide';
  if (status === 'success') return base + ' bg-emerald-500/15 text-emerald-300 border border-emerald-400/30';
  if (status === 'failed') return base + ' bg-red-500/15 text-red-300 border border-red-400/30';
  return base + ' bg-yellow-500/15 text-yellow-300 border border-yellow-400/30';
}

export default async function TransactionsPage() {
  const user = await currentUser();
  if (!user) {
    return <SignInPrompt message="Please sign in to view your transactions." returnHref="/" returnLabel="Return Home" />;
  }

  const internalId = await getUserIdByClerkId(user.id);
  if (!internalId) {
    return <main className="min-h-screen flex items-center justify-center text-sm text-red-300">User record not found.</main>;
  }

  const transactions = await getUserTransactions(internalId);

  return (
    <main className="success-bg min-h-screen w-full px-4 pt-28 pb-16">
      <div className="success-blob blob-a" />
      <div className="success-blob blob-b" />
      <div className="success-blob blob-c" />
      <div className="noise-overlay" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-300 via-emerald-200 to-emerald-400 bg-clip-text text-transparent drop-shadow">Transaction History</h1>
          <p className="text-sm md:text-base text-emerald-100/70 mt-3 max-w-xl mx-auto">
            A record of your plan purchases. Need help? <span className="text-emerald-300">support@silenttalk.app</span>
          </p>
        </header>

        {transactions.length === 0 ? (
          <div className="glass-panel mx-auto">
            <p className="text-sm text-emerald-100/80">No transactions yet.</p>
            <Link href="/payment" className="inline-block mt-4 text-xs text-emerald-300 underline">
              View Plans
            </Link>
          </div>
        ) : (
          <div className="relative">
            <div className="glass-panel w-full max-w-full overflow-x-auto text-left">
              <div className="gradient-ring" />
              <div className="shine" />
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-emerald-300/80 text-xs uppercase tracking-wider">
                    <th className="py-2 pr-4 font-semibold text-left">Date</th>
                    <th className="py-2 pr-4 font-semibold text-left">Plan</th>
                    <th className="py-2 pr-4 font-semibold text-left">Amount</th>
                    <th className="py-2 pr-4 font-semibold text-left">Status</th>
                    <th className="py-2 pr-4 font-semibold text-left">Access Ends</th>
                    <th className="py-2 pr-4 font-semibold text-left">Session ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="hover:bg-white/5 transition">
                      <td className="py-2 pr-4 whitespace-nowrap text-emerald-100/90">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 pr-4 uppercase text-emerald-200 font-medium">{tx.plan}</td>
                      <td className="py-2 pr-4 text-emerald-100/80">{tx.currency} {tx.amount}</td>
                      <td className="py-2 pr-4"><span className={statusBadge(tx.status)}>{tx.status}</span></td>
                      <td className="py-2 pr-4 text-emerald-100/70">{tx.endDate ? new Date(tx.endDate).toLocaleDateString() : '-'}</td>
                      <td className="py-2 pr-4 text-[10px] font-mono text-emerald-300/70 max-w-[140px] truncate" title={tx.stripeSession}>{tx.stripeSession}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link href="/dashboard" className="text-xs text-emerald-300/80 hover:text-emerald-200 transition underline decoration-dotted">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
