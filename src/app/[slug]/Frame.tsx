import React from 'react';

import {
  FrameContainer,
  FrameImage,
  type NextServerPageProps,
  getFrameMessage,
  getPreviousFrame,
  useFramesReducer,
} from 'frames.js/next/server';
import { init } from '@airstack/airstack-react';

import { DEBUG_HUB_OPTIONS } from '../debug/constants';

import { env } from '~/env';

import { createMeeting, getUserDetails } from '~/lib/utils';
import { reducer } from '~/app/[slug]/reducer';
import { getButtons } from '~/app/[slug]/components/frame/buttons';

import { getAddress } from '~/lib/config/web3';

import { type FarcasterSocial, type State, PAGE } from '~/types';

import {
  ConfirmDetails,
  DateSelect,
  ErrorPage,
  Home,
  SuccessPage,
} from '~/app/[slug]/components/frame';

const initialState: State = {
  page: PAGE.DATE_SELECT,
  date: null,
  error: null,
};

const UserFrame = async ({
  searchParams,
  params,
}: NextServerPageProps & { meetLink?: string }) => {
  const previousFrame = getPreviousFrame<State>(searchParams);
  const id = params.slug;

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

  const ownerAddress = await getAddress(id);
  let owner: FarcasterSocial | null = null;
  let meetingLink: string | null = null;

  if (state.page >= PAGE.DATE_SELECT) {
    if (!ownerAddress) return;
    owner = (await getUserDetails(ownerAddress)).Wallet.socials[0] ?? null;
  }

  if (state.page == PAGE.SUCCESS) {
    if (!ownerAddress) return;
    owner = (await getUserDetails(ownerAddress)).Wallet.socials[0] ?? null;
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

  const semibold = await fetch(
    `${env.NEXT_PUBLIC_HOST}/Geist-SemiBold.otf`
  ).then((res) => res.arrayBuffer());

  if (ownerAddress)
    return (
      <FrameContainer
        postUrl='/frames'
        pathname={`/${id}`}
        state={state}
        previousFrame={previousFrame}
      >
        <FrameImage
          aspectRatio='1.91:1'
          options={{
            width: 1200,
            height: 630,
            fonts: [
              {
                name: 'Geist SemiBold',
                data: semibold,
              },
            ],
          }}
        >
          <div
            tw='w-full h-full bg-white text-neutral-700 flex items-start'
            style={{
              fontFamily: 'Geist SemiBold',
            }}
          >
            {state.page === PAGE.HOME && <Home />}
            {state.page === PAGE.DATE_SELECT && <DateSelect owner={owner} />}
            {state.page === PAGE.CONFIRM && (
              <ConfirmDetails state={state} owner={owner} />
            )}
            {state.page === PAGE.ERROR && <ErrorPage state={state} />}
            {state.page === PAGE.SUCCESS && <SuccessPage />}
          </div>
        </FrameImage>
        {getButtons(state.page, meetingLink)}
      </FrameContainer>
    );
};

export default UserFrame;
