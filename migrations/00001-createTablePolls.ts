import { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE polls (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    is_private BOOLEAN NOT NULL,
    user_id INTEGER NOT NULL
  )`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE polls`;
}
