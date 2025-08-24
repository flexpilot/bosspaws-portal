'use client'
import { useState } from 'react'
import { createClient } from '../../../lib/supabase-browser'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password`
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
      {sent ? <p>Check your email for the reset link.</p> : (
        <form onSubmit={handleSubmit} className="card">
          <label className="label">Email</label>
          <input className="input mb-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button className="btn btn-primary w-full">Send reset link</button>
        </form>
      )}
    </div>
  )
}