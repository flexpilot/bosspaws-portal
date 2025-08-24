import Link from "next/link"
import { redirect } from 'next/navigation'
import { createClient } from '../../lib/supabase-server'

export default async function UpgradePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?next=/upgrade')

  const plans = [
    { id: "free", name: "Free", desc: "2 questions/week" },
    { id: "plan1", name: "Plan 1", desc: "40 questions/week" },
    { id: "plan2", name: "Plan 2", desc: "Unlimited questions" },
  ]

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {plans.map(p => (
        <div key={p.id} className="card">
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="text-gray-600 mt-1">{p.desc}</p>
          <Link href={`/signup?plan=${p.id}`} className="btn btn-primary mt-4">Select</Link>
        </div>
      ))}
      <div className="md:col-span-3 text-sm text-gray-500">Stripe payment can be connected here via Checkout.</div>
    </div>
  )
}