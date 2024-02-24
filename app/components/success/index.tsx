import React from 'react';
import { State } from '../../types';

const SuccessPage = () => {
  return (
    <div
      tw='flex flex-col items-center justify-center w-full h-full'
      style={{ gap: '2rem' }}
    >
      <img
        src={`${process.env.NEXT_PUBLIC_HOST}/huddle01-logo.png `}
        alt='Huddle01 Logo'
        width='500'
        height='100'
      />
      <div tw='font-bold text-neutral-700'>
        ✅ Meeting Scheduled Successfully
      </div>
    </div>
  );
};

export default SuccessPage;
