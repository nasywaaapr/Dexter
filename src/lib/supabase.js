// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Paste URL dan Key yang kamu copy tadi
const supabaseUrl = 'https://gkvzgaaekmpshhmilqet.supabase.co';  // ← PASTE PROJECT URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdrdnpnYWFla21wc2hobWlscWV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ3MzU1NDgsImV4cCI6MjA4MDMxMTU0OH0.gQE9hZ9XUkc2jwTViaUKdiYH1fSlavG_N3oKkkSS0t4';  // ← PASTE ANON KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey);