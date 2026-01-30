'use client'

import { useState } from 'react'

export default function FindID() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFindID = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult('')

    // Note: In Supabase, email is usually the unique identifier (ID).
    // This function simulates finding a "Username" associated with an email
    // if your app uses usernames. For privacy, we usually don't reveal emails.
    // Here we'll implement a simple API call if you have a custom username field.
    
    try {
      const res = await fetch('/api/auth/find-id', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      
      if (res.ok) {
        setResult(`Your Username is: ${data.username}`)
      } else {
        setError(data.error || 'User not found')
      }
    } catch (err) {
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-parchment p-4 font-hand">
      <div className="paper-card w-full max-w-md p-8 transform rotate-1">
        <h1 className="text-3xl text-brand-leather mb-6 text-center">Find My Username</h1>
        
        {result && (
          <div className="mb-6 p-4 bg-brand-moss/10 text-brand-moss rounded-rough border-2 border-dashed border-brand-moss text-center text-2xl">
            {result}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-rough border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleFindID} className="space-y-6">
          <div>
            <label className="block text-text-muted mb-2">Recovery Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-brand-leather/30 focus:border-brand-leather outline-none py-2 text-xl text-text-sepia placeholder-text-muted/50"
              placeholder="Enter your registered email"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-stamp bg-brand-leather text-white border-none hover:bg-brand-leather/90 justify-center flex"
          >
            {loading ? 'Searching...' : 'Find Username'}
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
