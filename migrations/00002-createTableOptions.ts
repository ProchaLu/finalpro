import { Sql } from 'postgres';

export type Option = {
  id: number;
  option: string;
  pollId: number;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE options (
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    option VARCHAR(255) NOT NULL,
    poll_id INTEGER NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE options`;
}
