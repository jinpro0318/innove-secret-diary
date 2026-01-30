'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  const handleSignUp = async () => {
    setLoading(true)
    setError('')
    // Simple sign up for demo
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: email.split('@')[0], // Default username
        }
      }
    })
    
    if (error) {
      setError(error.message)
    } else {
      alert('Check your email to confirm sign up!')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-parchment p-4 font-hand">
      <div className="paper-card w-full max-w-md p-10 transform rotate-1 relative">
        {/* Sealing Wax Stamp */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-wax rounded-full shadow-lg flex items-center justify-center text-white font-bold transform rotate-12 border-4 border-red-900/20">
          <span className="text-sm text-center leading-tight">SECRET<br/>ACCESS</span>
        </div>

        <h1 className="text-4xl text-brand-leather mb-8 text-center drop-shadow-sm">My Diary</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-rough border border-red-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-text-muted mb-2 text-lg">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-brand-leather/30 focus:border-brand-leather outline-none py-2 text-xl text-text-sepia placeholder-text-muted/30 transition-colors"
              placeholder="writer@diary.com"
              required
            />
          </div>

          <div>
            <label className="block text-text-muted mb-2 text-lg">Secret Code</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-brand-leather/30 focus:border-brand-leather outline-none py-2 text-xl text-text-sepia placeholder-text-muted/30 transition-colors"
              placeholder="••••••••"
              required
            />
            <div className="flex justify-between mt-2 text-sm">
               <a href="/auth/find-id" className="text-brand-moss hover:underline">Find Username</a>
               <a href="/auth/forgot-password" className="text-brand-wax hover:underline">Forgot Password?</a>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-stamp bg-brand-leather text-white border-none hover:bg-brand-leather/90 justify-center flex text-xl"
            >
              {loading ? 'Opening...' : 'Unlock Diary'}
            </button>
            
            <button
              type="button"
              onClick={handleSignUp}
              disabled={loading}
              className="w-full btn-stamp bg-transparent border-2 border-brand-leather text-brand-leather hover:bg-brand-leather/10 justify-center flex"
            >
              Create New Diary
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
