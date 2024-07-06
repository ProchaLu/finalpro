import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserWithPasswordHashInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00000-createTableUsers';

export type LoginResponseBodyPost =
  | {
      user: Pick<User, 'userName'>;
    }
  | {
      errors: { message: string }[];
    };

// const userSchema = z.object({
//   username: z.string().min(3),
//   password: z.string().min(3), // for future change the min() and include .regex('') in order to force strong passwords. in the zod doc you can see more.
//   email: z.string().min(3),
// });

export async function POST(
  request: NextRequest,
): Promise<NextResponse<LoginResponseBodyPost>> {
  // Implement the user login workflow

  // 1. Get the user data from the request
  const body = await request.json();

  // 2. Validate the user data with zod
  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. Verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
    result.data.email,
  );

  // console.log('userWithPasswordHash: ', userWithPasswordHash);

  if (!userWithPasswordHash) {
    return NextResponse.json(
      { errors: [{ message: 'username, email or password invalid' }] },
      {
        status: 500,
      },
    );
  }
  // 4. Validate the user password by comparing with hashed password

  const passwordHash = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!passwordHash) {
    return NextResponse.json(
      { errors: [{ message: 'username, email or password invalid' }] },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    user: { userName: userWithPasswordHash.userName },
  });
}
