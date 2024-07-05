import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  passwordHash: string;
  email: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name VARCHAR(80) NOT NULL UNIQUE,
      password_hash VARCHAR(80) NOT NULL,
      email VARCHAR(255) NOT NULL
    )`;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}

// deleted column is_online BOOLEAN NOT NULL from table (also isOnline: boolean; from type) in order to achieve registration. is_online was created in order to have a user allowed to take or create a poll only when logged in, but i can do that by using session token. Remigration is needed in order to change anything from the table
