/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { PAGE } from '~/types';

import {
  FrameButton,
  type FrameElementType,
  FrameInput,
} from 'frames.js/next/server';

export type ButtonType =
  | {
      title: string;
    }
  | {
      title: string;
      action: 'link';
      link: string;
    }
  | {
      title: string;
      action: 'input';
    };

export const getButtons = (page: PAGE, meetingLink: string | null) => {
  const buttons: ButtonType[] = [];

  switch (page) {
    case PAGE.HOME:
      buttons.push({ title: '⚡ Get Started' });
      break;
    case PAGE.DATE_SELECT:
      buttons.push({ title: '12/03/2024', action: 'input' });
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
      buttons.push({ title: 'Link', action: 'link', link: meetingLink ?? '' });
      buttons.push({ title: '← Go Back' });
      break;
  }

  const res = buttons.map((button, idx) => {
    if ('action' in button) {
      if (button.action === 'link') {
        return (
          <FrameButton
            key={idx}
            action='link'
            target={meetingLink ?? 'https://app.huddle01.com'}
          >
            {button.title}
          </FrameButton>
        );
      } else if (button.action === 'input') {
        return <FrameInput key={idx} text={button.title} />;
      }
    } else {
      return <FrameButton key={idx}>{button.title}</FrameButton>;
    }
  });

  // create react element of type Array<React.ReactElement<FrameElementType> | null>
  const element = res as unknown as React.ReactElement<
    FrameElementType,
    string | React.JSXElementConstructor<any>
  > | null;
  return element;
};
