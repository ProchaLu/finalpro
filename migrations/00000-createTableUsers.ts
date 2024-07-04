import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  passworHash: string;
  email: string;
  isOnline: boolean;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name VARCHAR(80) NOT NULL,
      password_hash VARCHAR(80) NOT NULL,
      email VARCHAR(255) NOT NULL,
      is_online BOOLEAN NOT NULL
    )`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}
