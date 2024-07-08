'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteSession } from '../../../database/sessions';

export async function logout() {
  // 1. Get the sessions token from the cookie
  const cookieStore = cookies();

  const session = cookieStore.get('sessionToken');

  // 2. Delete the session from the database based on the token
  if (session) await deleteSession(session.value);

  // 3. Delete the session cookie from the browser
  cookieStore.delete('sessionToken');

  // 4. Try to redirect to homepage after logout
  redirect(`/`); // not sure if this is a clean way to do it
}
