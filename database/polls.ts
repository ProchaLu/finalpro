import { cache } from 'react';
import { sql } from './connect';

type Poll = {
  id: number;
  title: string;
  description: string;
  is_private: boolean;
  user_id: number;
};

export const getPollsInsecure = cache(async () => {
  const polls = await sql<Poll[]>`
  SELECT
    *
  FROM
    polls
`;

  return polls;
});

export const getPollsInsecure = cache(async (id: number) => {
  const [poll] = await sql<Poll[]>`
  SELECT
    *
  FROM
    polls
    WHERE id = ${id}
`;

  return poll;
});
// export function getPoll(id) {
//   return polls.find((poll) => poll.id === id);
// }
// console.log(
//   await sql`
//   SELECT
//     *
//   FROM
//     polls
// ,
// `,
// );
