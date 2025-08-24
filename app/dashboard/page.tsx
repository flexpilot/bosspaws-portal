import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../lib/supabase-server'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/dashboard')
  const plan = (user.user_metadata as any)?.plan || 'free'

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p>Welcome, <strong>{user.email}</strong></p>
      <div className="card">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Current Plan</div>
            <div className="text-lg font-semibold capitalize">{plan}</div>
          </div>
          <Link href="/upgrade" className="btn btn-primary">Upgrade Plan</Link>
        </div>
      </div>
      <div className="card">
        <div className="text-sm text-gray-500 mb-1">Weekly Usage</div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div className="bg-brand h-3 rounded-full" style={{ width: plan==='free' ? '10%' : plan==='plan1' ? '25%' : '60%' }}></div>
        </div>
        <div className="text-xs text-gray-500 mt-1">Demo value — connect to real counters later.</div>
      </div>
    </section>
  )
}