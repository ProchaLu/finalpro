import { cache } from 'react';

export type Poll = {
  id: number;
  title: string;
  description: string;
  isPrivate: boolean;
  userId: number;
};

export const createPoll = cache();
