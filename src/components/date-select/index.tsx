/* eslint-disable @next/next/no-img-element */
import React from 'react';

import type { FarcasterSocial } from '~/types';

interface Props {
  owner: FarcasterSocial | null;
}

const DateSelect = ({ owner }: Props) => {
  return (
    <div
      tw='flex flex-col items-center justify-between w-full h-full border border-black p-12'
      style={{ gap: '1rem' }}
    >
      <div
        tw='flex flex-col justify-center items-center'
        style={{ gap: '1rem' }}
      >
        <div tw='text-5xl text-neutral-800'>
          Enter a date and time for your meeting
        </div>
        <div tw='flex flex-row w-full justify-center' style={{ gap: '1rem' }}>
          <div tw='text-5xl'>eg. 12/03/2024 15:30-16:00</div>
        </div>
        <div tw='flex flex-row w-full justify-center' style={{ gap: '1rem' }}>
          <div>Format: DD/MM/YYYY HH:MM-HH:MM (UTC)</div>
        </div>
      </div>
      <div tw='flex flex-row w-full justify-end'>
        <div tw='flex flex-row' style={{ gap: '1rem' }}>
          <img
            src={owner?.profileImage}
            alt='Owner Profile'
            width='128'
            height='128'
            tw='h-32 w-32 rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default DateSelect;
