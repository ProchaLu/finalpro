import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { getValidSession } from '../../../database/sessions';

type Props = {
  params: {
    username: String;
  };
};

export default async function UserProfile(props: Props) {
  // Task: Add redirect to login page if user is not logged in
  // 1. Check if the sessionToken cookie exists
  const sessionCookie = cookies().get('sessionToken');

  // 2. Query the current user with the sessionToken
  const session = sessionCookie && (await getValidSession(sessionCookie.value));
  // 3. If user doesn't exist, redirect to login page
  if (!session) {
    redirect(`/login?returnTo=/profile/${props.params.username}`);
  }
  // 4. If user exists, render the page

  return (
    <div>
      <h1>{props.params.username}'s Profile</h1>
      <LogoutButton />
    </div>
  );
}
