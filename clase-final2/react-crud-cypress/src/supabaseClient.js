import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pxfibxywyenhuupzgmso.supabase.co'
const supabaseAnonKey = ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
