// supabase_repl.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import repl from 'repl';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Determine the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the absolute path to .env.local
const envPath = resolve(__dirname, '.env.local');

// Load environment variables from .env.local
import * as dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

// Initialize Supabase client
const db = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Make 'db' available globally for the REPL session
//ignoring the error because we know that global is available in nodejs
// @ts-ignore
global.db = db;

// Start the REPL
const r = repl.start();

r.on('exit', () => {
  console.log('Exiting REPL');
  process.exit();
});
