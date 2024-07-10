import { Sql } from 'postgres';
import { z } from 'zod';

export type Poll = {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  userId: number;
};

export const userSchema = z.object({});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE polls (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(255) NOT NULL,
      description varchar(255) NOT NULL,
      is_private boolean NOT NULL,
      user_id integer NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE polls`;
}
