import React from 'react';

import {
  FrameButton,
  FrameContainer,
  FrameInput,
  FrameImage,
  type NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from 'frames.js/next/server';
import { init } from '@airstack/airstack-react';

import { DEBUG_HUB_OPTIONS } from './debug/constants';

import { env } from '~/env';

import { createMeeting, getUserDetails } from '~/lib/utils';
import { ETH_ADDRESS } from '~/lib/config';
import { reducer } from '~/lib/reducer';
import { getButtons } from '~/lib/buttons';

import { type FarcasterSocial, type State, PAGE } from '~/types';

import {
  ConfirmDetails,
  DateSelect,
  ErrorPage,
  Home,
  SuccessPage,
} from '~/components';

const initialState: State = {
  page: PAGE.HOME,
  date: null,
  error: null,
};

export default async function Page({ searchParams }: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(searchParams);

  const frameMessage = await getFrameMessage(previousFrame.postBody, {
    ...DEBUG_HUB_OPTIONS,
  });

  if (frameMessage && !frameMessage?.isValid) {
    throw new Error('Invalid frame payload');
  }

  init(env.AIRSTACK_API_KEY, {
    env: 'prod',
    cache: true,
  });

  const [state] = useFramesReducer<State>(reducer, initialState, previousFrame);

  let owner: FarcasterSocial | null = null;
  let meetingLink: string | null = null;

  if (state.page >= PAGE.DATE_SELECT) {
    owner = (await getUserDetails(ETH_ADDRESS)).Wallet.socials[0] ?? null;
  }

  if (state.page == PAGE.SUCCESS) {
    owner = (await getUserDetails(ETH_ADDRESS)).Wallet.socials[0] ?? null;
    const user = frameMessage?.requesterUserData;
    const startDate = state.date!.at(0)!;
    const endDate = state.date!.at(1)!;

    const data = await createMeeting(
      startDate,
      endDate,
      user?.username ?? user?.displayName ?? ''
    );

    meetingLink = data.meetingLink ?? `https://app.huddle01.com/${data.roomId}`;
  }

  return (
    <FrameContainer
      postUrl='/frames'
      pathname='/'
      state={state}
      previousFrame={previousFrame}
    >
      <FrameImage aspectRatio='1.91:1'>
        <div tw='w-full h-full bg-white text-neutral-700 flex items-start font-sans'>
          {state.page === PAGE.HOME && <Home />}
          {state.page === PAGE.DATE_SELECT && <DateSelect owner={owner} />}
          {state.page === PAGE.CONFIRM && (
            <ConfirmDetails state={state} owner={owner} />
          )}
          {state.page === PAGE.ERROR && <ErrorPage state={state} />}
          {state.page === PAGE.SUCCESS && <SuccessPage />}
        </div>
      </FrameImage>
      {getButtons(state.page)}
      {state.page === PAGE.DATE_SELECT ? (
        <FrameInput text='12/03/2024 15:30-16:00' />
      ) : null}
      {state.page === PAGE.SUCCESS ? (
        <FrameButton
          action='link'
          target={meetingLink ?? 'https://app.huddle01.com'}
        >
          Link
        </FrameButton>
      ) : null}
    </FrameContainer>
  );
}
