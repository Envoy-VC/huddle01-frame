/* eslint-disable @next/next/no-img-element */
import React from 'react';

const Home = () => {
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
      <div tw='font-bold'>
        Schedule Meetings on Huddle01 using Farcaster Frames
      </div>
    </div>
  );
};

export default Home;
