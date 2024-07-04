import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE responses (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    poll_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    option_id INTEGER NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE responses`;
}
