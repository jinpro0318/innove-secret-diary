import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    // Return a mock or throw a more friendly error, or just return null and handle it in UI
    // For now, let's allow it to throw but we will catch it in UI components if needed
    // Actually, throwing here is fine if we can't init, but let's check envs first
    throw new Error("Supabase Environment Variables missing. Check .env.local")
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}
