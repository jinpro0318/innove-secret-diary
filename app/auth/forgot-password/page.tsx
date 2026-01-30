'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const supabase = createClient()

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for the password reset link.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-parchment p-4 font-hand">
      <div className="paper-card w-full max-w-md p-8 transform rotate-1">
        <h1 className="text-3xl text-brand-leather mb-6 text-center">Forgot Password?</h1>
        <p className="text-text-sepia mb-6 text-center">
          Don't worry. Enter your email and we'll send you a magic link to reset it.
        </p>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-rough border border-green-300">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-rough border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-text-muted mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-brand-leather/30 focus:border-brand-leather outline-none py-2 text-xl text-text-sepia placeholder-text-muted/50 transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-stamp bg-brand-wax text-white border-none hover:bg-brand-wax/90 justify-center flex"
          >
            {loading ? 'Sending Magic...' : 'Send Reset Link'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <a href="/auth/login" className="text-brand-leather underline hover:text-brand-wax transition-colors">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
