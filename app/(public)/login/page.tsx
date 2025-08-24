'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '../../../lib/supabase-browser'

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const searchParams = useSearchParams()
  const nextUrl = searchParams.get('next') || '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.replace(nextUrl)
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError(null)
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo }
    })
    if (error) setError(error.message)
  }

  return (
    <div className="grid md:grid-cols-[1fr_minmax(0,480px)_1fr] gap-8 items-center">
      {/* Left mascot (decorative, hidden on mobile) */}
      <div className="hidden md:flex justify-end pr-2">
        <Image
          src="/mascot-left.png"
          alt=""                 // decorative image
          width={260}
          height={260}
          className="opacity-95 select-none pointer-events-none"
        />
      </div>

      {/* Center column: form */}
      <div className="max-w-md w-full mx-auto">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-secondary">
          Sign in to your BossPaws portal. You’ll land on your dashboard.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-200 p-3 text-sm"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="card mt-6" aria-busy={loading}>
          <label className="label" htmlFor="email">Email</label>
          <input
            id="email"
            className="input mb-3"
            type="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="label" htmlFor="password">Password</label>
          <div className="mb-4 relative">
            <input
              id="password"
              className="input pr-12"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e=>setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              onClick={()=>setShowPass(s=>!s)}
              className="absolute inset-y-0 right-2 my-1 px-2 text-secondary hover:text-white rounded-md"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="btn btn-outline w-full mt-3"
          aria-label="Continue with Google"
        >
          Continue with Google
        </button>

        <div className="text-sm mt-4 flex justify-between">
          <Link href="/forgot-password" className="text-secondary hover:text-white">Forgot password?</Link>
          <Link href="/signup" className="text-secondary hover:text-white">Create account</Link>
        </div>
      </div>

      {/* Right mascot (decorative, hidden on mobile) */}
      <div className="hidden md:flex justify-start pl-2 mt-7">
        <Image
          src="/mascot-right.png"
          alt=""                 // decorative image
          width={260}
          height={260}
          className="opacity-95 select-none pointer-events-none"
        />
      </div>
    </div>
  )
}
