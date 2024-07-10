import { NextRequest, NextResponse } from 'next/server';
import { createPoll, getPollById } from '../../../../database/polls';

// 1. Get the polls data from the request
// 2. Validate the polls data with zod
// 3. Save the polls information in the database
// 4 sessiontoken for the userId and cookie is needed
// so is_private is not needed for now because i 1. hard coded to false by default and also in your polls database you only have these values:
// export const createPoll = cache(
// async (title: string, description: string, userId: number)
