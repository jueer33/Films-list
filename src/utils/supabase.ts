import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pmwgmjiujdqmffmsufqy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtd2dtaml1amRxbWZmbXN1ZnF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3Njg5MzgsImV4cCI6MjA0NzM0NDkzOH0.r945oCkRUn6RYYD_12Lr4ULyfjJvMl-Eqx02Rvu1mzE';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
