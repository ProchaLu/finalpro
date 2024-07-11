import { NextRequest, NextResponse } from 'next/server';
import { createPoll, getPollById } from '../../../../database/polls';
import { getValidSession } from '../../../../database/sessions';
import {
  Poll,
  pollSchema,
} from '../../../../migrations/00001-createTablePolls';

export type CreatePollResponseBodyPost =
  | {
      poll: Poll;
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreatePollResponseBodyPost>> {
  console.log('test');
  // 1. Get the polls data from the request
  const body = await request.json();
  console.log(body);

  // const { title, description } = body;

  // 2. Validate the polls data with zod
  const result = pollSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Save the polls information in the database
  const newPoll = await createPoll(
    result.data.title,
    result.data.description,
    // result.data.userId,
  );

  if (!newPoll) {
    return NextResponse.json(
      { errors: [{ message: 'Creating Poll failed' }] },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({ poll: newPoll });
}

// 4 sessiontoken for the userId and cookie is needed
// so is_private is not needed for now because i 1. hard coded to false by default and also in your polls database you only have these values:
// export const createPoll = cache(
// async (title: string, description: string, userId: number)
