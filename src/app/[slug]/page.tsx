import React from 'react';

import UserFrame from './Frame';

import { type NextServerPageProps } from 'frames.js/next/server';

const UserPage = (props: NextServerPageProps) => {
  return (
    <div>
      <UserFrame {...props} />
    </div>
  );
};

export default UserPage;
