import { cache } from 'react';
import { sql } from './connect';

export type User = {
  id: number;
  userName: string;
  email: string;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

export const getUserInsecure = cache(
  async (userName: string, email: string) => {
    const [user] = await sql<User[]>`
  SELECT
    users.id,
    users.user_name,
    users.email
  FROM
    users
  WHERE
    user_name = ${userName}       -- no comma but an AND!!!!!!!!!!
    AND email = ${email}
  `;
    return user;
  },
);

// export const getUserInsecure = cache(async (userName: string) => {
//   const [user] = await sql<User[]>`
//   SELECT
//     users.id,
//     users.user_name
//   FROM
//     users
//   WHERE
//     user_name = ${userName}
//   `;
//   return user;
// });
// import { cache } from 'react';
// import { User } from '../migrations/00000-createTableUsers.js';
// import { sql } from './connect.js';

export const createUserInsecure = cache(
  async (userName: string, passwordHash: string, email: string) => {
    // cache(async (newUser: Omit<User, 'id'>)
    const [user] = await sql<User[]>`
  INSERT INTO
  users (
    user_name,
    password_hash,
    email
  )
  VALUES
  (
    ${userName},
    ${passwordHash},
    ${email}
  )
  RETURNING
  users.id,
  users.user_name,
  users.email
  `;
    return user;
  },
);

export const getUserWithPasswordHashInsecure = cache(
  async (userName: string, email: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
  SELECT
    *
  FROM
    users
  WHERE
    user_name = ${userName}       -- no comma but an AND!!!!!!!!!!
    AND email = ${email}
  `;
    return user;
  },
);

// CRUD video From migrations
