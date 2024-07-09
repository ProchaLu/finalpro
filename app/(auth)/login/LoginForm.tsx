'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../../util/validation';
import ErrorMessage from '../../ErrorMessage';
import { LoginResponseBodyPost } from '../api/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
      }),

      headers: {
        'Content-Type': 'application/json',
      },
    });
    // for console.log
    const data: LoginResponseBodyPost = await response.json();
    console.log('Login response data:', data);

    if ('errors' in data) {
      return setErrors(data.errors);
    }

    console.log('data.user.userName:', data.user.userName);

    // Redirect from the successful login to the profile
    // This is not secured
    // router.push(props.returnTo || `/profile/${data.user.userName}`);

    // This is secured
    router.push(
      getSafeReturnToPath(props.returnTo) || `/profile/${data.user.userName}`,
    );

    router.refresh();
  }

  return (
    <form onSubmit={async (event) => await handleLogin(event)}>
      <label>
        userName
        <input
          value={username}
          onChange={(event) => setUsername(event.currentTarget.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
        />
      </label>
      <button>Sign In</button>

      {errors.map((error) => (
        <div className="error" key={`error-${error.message}`}>
          <ErrorMessage>{error.message}</ErrorMessage>
        </div>
      ))}
    </form>
  );
}
