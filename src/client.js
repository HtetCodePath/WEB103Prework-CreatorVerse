import { createClient } from '@supabase/supabase-js';

const URL = 'https://wfnfcupsvhdulidedjyn.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmbmZjdXBzdmhkdWxpZGVkanluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NzY2MzUsImV4cCI6MjA3MTU1MjYzNX0.RdW_DBfS0h5rLW5Qbmyop-wIb8H6TH9lX7wpYXlJmvs';

export const supabase = createClient(URL, API_KEY);