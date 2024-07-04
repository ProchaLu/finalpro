type User = {
  id: number;
  userName: string;
  email: string;
  isOnline: boolean;
};

type UserWithPasswordHash = User & {
  passwordHash: string;
};

// import { cache } from 'react';
// import { User } from '../migrations/00000-createTableUsers.js';
// import { sql } from './connect.js';

// export const createUserInsecure = cache(async (newUser: Omit<User, 'id'>) => {
//   const [user] = await sql<User[]>`
//   INSERT INTO
//   users (
//     user_name,
//     password_hash,
//     email,
//     is_online
//   )
//   VALUES
//   (
//     ${newUser.userName},
//     ${newUser.passwordHash},
//     ${newUser.email},
//     ${newUser.isOnline}
//   )
//   RETURNING users.*       -- You might want to change that later
//   `;
//   return user;
// });

// CRUD video From migrations
