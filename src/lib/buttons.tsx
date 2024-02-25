/* eslint-disable @typescript-eslint/no-explicit-any */
import { PAGE } from '../types';

import { FrameButton, type FrameElementType } from 'frames.js/next/server';

import React from 'react';

export const getButtons = (page: PAGE) => {
  const buttons: { title: string }[] = [];

  switch (page) {
    case PAGE.HOME:
      buttons.push({ title: '⚡ Get Started' });
      break;
    case PAGE.DATE_SELECT:
      buttons.push({ title: '← Go Back' });
      buttons.push({ title: '⚡ Schedule Meeting' });
      break;
    case PAGE.ERROR:
      buttons.push({ title: '← Go Back' });
      break;
    case PAGE.CONFIRM:
      buttons.push({ title: '← Go Back' });
      buttons.push({ title: '✅ Confirm' });
      break;
    case PAGE.SUCCESS:
      buttons.push({ title: '← Go Back' });
      break;
  }

  const res = buttons.map((button) => (
    <FrameButton key={button.title}>{button.title}</FrameButton>
  ));

  // create react element of type Array<React.ReactElement<FrameElementType> | null>
  const element = res as unknown as React.ReactElement<
    FrameElementType,
    string | React.JSXElementConstructor<any>
  > | null;
  return element;
};
