import { cache } from 'react';
import { Poll } from '../migrations/00001-createTablePolls';
import { sql } from './connect';

// export type Poll = {
//   id: number;
//   title: string;
//   description: string;
//   isPrivate: boolean;
//   userId: number;
// };

export type PollWithId = Poll & { id: number };

export const createPoll = cache(
  async (title: string, description: string /*userId: number*/) => {
    const [poll] = await sql<Poll[]>`
      -- was PollWithId before
      INSERT INTO
        polls (title, description)
      VALUES
        (
          ${title},
          ${description}
        )
      RETURNING
        id,
        title,
        description
    `;
    return poll;
  },
);

export const getPollById = cache(async (id: number) => {
  const [poll] = await sql<PollWithId[]>`
    SELECT
      *
    FROM
      polls
    WHERE
      id = ${id}
  `;
  return poll;
});

export const getAllPolls = cache(async () => {
  const polls = await sql<PollWithId[]>`
    SELECT
      *
    FROM
      polls
  `;
  return polls;
});
