'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase-browser'

export default function SignupPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedPlan = searchParams.get('plan') || 'free'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState('Weak')
  const [plan, setPlan] = useState(preselectedPlan)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onPassword = (val: string) => {
    setPassword(val)
    if (val.length < 6) setStrength('Weak')
    else if (val.length < 10) setStrength('Medium')
    else setStrength('Strong')
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { plan } }
    })
    if (error) setError(error.message)
    else router.replace('/dashboard')
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSignup} className="card">
        <label className="label">Plan</label>
        <select className="input mb-3" value={plan} onChange={e=>setPlan(e.target.value)}>
          <option value="free">Free (2/wk)</option>
          <option value="plan1">Plan 1 (40/wk)</option>
          <option value="plan2">Plan 2 (Unlimited)</option>
        </select>
        <label className="label">Email</label>
        <input className="input mb-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <label className="label">Password</label>
        <input className="input mb-1" type="password" value={password} onChange={e=>onPassword(e.target.value)} required />
        <p className="text-sm mb-4">Password strength: <strong>{strength}</strong></p>
        <button className="btn btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
      </form>
      <div className="text-sm mt-3">
        Already have an account? <Link className="text-brand" href="/login">Login</Link>
      </div>
    </div>
  )
}