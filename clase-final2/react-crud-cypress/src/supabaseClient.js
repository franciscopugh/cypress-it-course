import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pxfibxywyenhuupzgmso.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZmlieHl3eWVuaHV1cHpnbXNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0Njg1MzQsImV4cCI6MjA2ODA0NDUzNH0.eWqkJpmFLI6bgJCWkPjevuDivH0OB_3sQLWOTmo3yno'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
