import React from 'react';
import { humanizeDates } from '../../../../lib/utils';

import { type State, type FarcasterSocial } from '../../../../types';

interface Props {
  state: State;
  owner: FarcasterSocial | null;
}
const ConfirmDetails = ({ state, owner }: Props) => {
  return (
    <div
      tw='flex flex-col items-center justify-between w-full h-full border border-black p-12'
      style={{ gap: '1rem' }}
    >
      <div tw='flex flex-col justify-center items-center'>
        <div tw='text-6xl font-neutral-800 text-center leading-[1]'>
          Confirm the date and time
        </div>
        <div tw='text-6xl font-neutral-800 text-center leading-[1]'>
          for your meeting
        </div>

        <div tw='flex flex-row w-full justify-center py-12'>
          <div tw='text-5xl'>{humanizeDates(state.date ?? [])}</div>
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

export default ConfirmDetails;
