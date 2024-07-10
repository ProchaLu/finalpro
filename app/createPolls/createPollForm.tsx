'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getSafeReturnToPath } from '../../util/validation';
import ErrorMessage from '../ErrorMessage';

type Props = { returnTo?: string | string[] };

export default function PollForm(props: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const router = useRouter();

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        options,
      }),
    });

    const data = await response.json();
    console.log('Poll creation response data: ', data);

    if (response.ok) {
      return setErrors(data.errors);
    }

    // Redirect after successful poll creation
    router.push(getSafeReturnToPath(props.returnTo) || '/createPolls');
    router.refresh();
  }

  return (
    <div>
      <h1>Create a new Poll</h1>
      <form onSubmit={async (event) => await handleSubmit(event)}>
        <div>
          <label>
            Poll Title:
            <input
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(event) =>
                  handleOptionChange(index, event.currentTarget.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddOption}>
            Add Option
          </button>
        </div>
        <button type="submit">Create Poll</button>

        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            <ErrorMessage>{error.message}</ErrorMessage>
          </div>
        ))}
      </form>
    </div>
  );
}
