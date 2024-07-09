import { Sql } from 'postgres';
import { z } from 'zod';

export type User = {
  id: number;
  userName: string;
  passwordHash: string;
  email: string;
};

export const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(3), // for future change the min() and include .regex('') in order to force strong passwords. in the zod doc you can see more.
  email: z.string().min(3),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name varchar(80) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL,
      email varchar(255) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE users`;
}

// deleted column is_online BOOLEAN NOT NULL from table (also isOnline: boolean; from type) in order to achieve registration. is_online was created in order to have a user allowed to take or create a poll only when logged in, but i can do that by using session token. Remigration is needed in order to change anything from the table
