import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL!;
const authToken = process.env.TURSO_AUTH_TOKEN;
const client = createClient({ url, authToken });

async function run() {
  await client.execute({
    sql: `UPDATE menus SET href = '/' WHERE id = 1 AND label = 'Home'`,
    args: [],
  });
  console.log('✅ Updated "Home" menu href from "/profil" to "/"');
  
  // Verify
  const result = await client.execute('SELECT id, label, href FROM menus ORDER BY sort_order');
  console.table(result.rows);
}

run().catch(console.error);
