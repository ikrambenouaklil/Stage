import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
// eslint-disable-next-line no-unused-vars
const supabase = createClient(
  'https://yldrhcbfxybbfypeoalz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsZHJoY2JmeHliYmZ5cGVvYWx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxNjI5NzUsImV4cCI6MjAyODczODk3NX0.to3hM2WhI7RvrC50nQjhjUg4b_jJCDD0ZUYHMYbUn3Q',
);