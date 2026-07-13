import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!url || !anonKey) {
  // eslint-disable-next-line no-console
  console.warn('Supabase env vars missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.')
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: false },
})

export type MenuItem = {
  id: string
  name: string
  description: string | null
  price: number
  original_price: number | null
  category: string
  image_url: string | null
  popular: boolean
  available: boolean
}

export type OrderItem = {
  menu_item_id: string
  name: string
  price: number
  quantity: number
}
