import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import {
  createUserInsecure,
  getUserInsecure,
  User,
} from '../../../../database/users';
import { userSchema } from '../../../../migrations/00000-createTableUsers';

export type RegisterResponseBodyPost =
  | {
      user: User;
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
): Promise<NextResponse<RegisterResponseBodyPost>> {
  // Implement the user registration workflow

  // console.log(await request.json());

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

  // 3. Check if user already exist in the database

  const user = await getUserInsecure(result.data.username, result.data.email);

  if (user) {
    return NextResponse.json(
      { errors: [{ message: 'Username already taken' }] },
      {
        status: 401,
      },
    );
  }

  // 4. Hash the plain password from the user

  const passwordHash = await bcrypt.hash(result.data.password, 12);

  // if (!passwordHash) {
  //   return NextResponse.json(
  //     { errors: [{ message: 'Login failed' }] },
  //     {
  //       status: 400,
  //     },
  //   );
  // }

  // console.log('Information: ', result.data.password, passwordHash);

  // 5. Save the user information with the hashed password in the database

  const newUser = await createUserInsecure(
    result.data.username,
    passwordHash,
    result.data.email,
  );

  if (!newUser) {
    return NextResponse.json(
      { errors: [{ message: 'Registration failed' }] },
      {
        status: 400,
      },
    );
  }

  console.log('User: ', newUser);

  return NextResponse.json({ user: newUser });
}

// maybe error comes from not providing email and isOnline
