'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../lib/supabase-browser'

export default function ResetPasswordPage() {
  const supabase = createClient()
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.updateUser({ password })
    if (error) setError(error.message)
    else {
      setDone(true)
      setTimeout(()=>router.replace('/login'), 1200)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
      {done ? <p>Password updated. Redirecting to login…</p> : (
        <form onSubmit={handleSubmit} className="card">
          <label className="label">New Password</label>
          <input className="input mb-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <button className="btn btn-primary w-full">Update password</button>
        </form>
      )}
    </div>
  )
}