import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE participants (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    poll_id INTEGER NOT NULL,
    status BOOLEAN NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE participants`;
}
