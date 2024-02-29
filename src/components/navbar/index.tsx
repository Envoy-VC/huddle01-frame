'use client';

import React from 'react';

import { ConnectKitButton } from 'connectkit';

const Navbar = () => {
  return (
    <div className='border p-3 py-4'>
      <div className='mx-auto flex w-full max-w-screen-2xl flex-row items-center justify-between'>
        <div>Huddle01 Schedule</div>
        <ConnectKitButton />
      </div>
    </div>
  );
};

export default Navbar;
