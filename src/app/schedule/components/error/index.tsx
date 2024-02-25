import React from 'react';
import type { State } from '~/types';

interface Props {
  state: State;
}

const ErrorPage = ({ state }: Props) => {
  return (
    <div
      tw='flex flex-col items-center justify-center w-full h-full'
      style={{ gap: '1rem' }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_HOST}/huddle01-logo.png `}
        alt='Huddle01 Logo'
        width='500'
        height='100'
      />
      <div tw='font-bold text-red-500'>
        {state.error ?? 'An error occurred'}
      </div>
    </div>
  );
};

export default ErrorPage;
