/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { fetchQuery } from '@airstack/airstack-react';
import { API } from '@huddle01/server-sdk/api';

import type { AirstackResponse, FarcasterSocial } from '~/types';
import { ETH_ADDRESS } from '~/lib/config';

import { env } from '~/env';

export const getUserDetails = async (address: string) => {
  const query = `
    query GetFarcasterDetails($address: Identity!) {
      Wallet(input: { blockchain: ethereum, identity: $address }) {
        socials(input: { filter: { dappName: { _eq: farcaster } } }) {
          fnames
          followerCount
          followingCount
          identity
          isDefault
          profileImage
        }
      }
    }
  `;

  const { data, error } = await fetchQuery(
    query,
    {
      address: address,
    },
    { cache: true }
  );

  if (error) {
    throw new Error('Failed to fetch user details');
  }

  return data as AirstackResponse<FarcasterSocial>;
};

export const formatDate = (date: string): string[] => {
  // DD/MM/YYYY HH:MM-HH:MM get two dates start and end
  const [dateString, timeString] = date.split(' ');
  if (!dateString || !timeString) throw new Error('Invalid date format');
  const [start, end] = timeString.split('-');
  if (!start || !end) throw new Error('Invalid date format');
  const [day, month, year] = dateString.split('/');
  if (!day || !month || !year) throw new Error('Invalid date format');
  const [startHour, startMinute] = start.split(':');
  if (!startHour || !startMinute) throw new Error('Invalid date format');
  const [endHour, endMinute] = end.split(':');
  if (!endHour || !endMinute) throw new Error('Invalid date format');

  const startDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(startHour),
    parseInt(startMinute)
  );

  const endDate = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(endHour),
    parseInt(endMinute)
  );

  if (startDate > endDate)
    throw new Error('Start date must be before end date');
  if (startDate < new Date())
    throw new Error('Start date must be in the future');
  if (endDate < new Date()) throw new Error('End date must be in the future');
  if (endDate.getTime() - startDate.getTime() > 7200000)
    throw new Error('Max duration is 2 hours');

  const dates = [startDate.toISOString(), endDate.toISOString()];
  return dates;
};

export const humanizeDates = (dates: string[]): string => {
  const startDate = new Date(dates?.at(0) ?? '');
  const endDate = new Date(dates?.at(1) ?? '');

  const startDay = startDate.toLocaleString('en-us', { weekday: 'short' });
  const startMonth = startDate.toLocaleString('en-us', { month: 'short' });
  const startDayOfMonth = startDate.getDate();
  const startYear = startDate.getFullYear();
  const startHour = startDate.getHours();
  let startMinute = String(startDate.getMinutes());
  startMinute =
    parseInt(startMinute) < 10 ? `0${startMinute}` : `${startMinute}`;
  const startAMPM = startHour >= 12 ? 'PM' : 'AM';

  const endHour = endDate.getHours();
  let endMinute = String(endDate.getMinutes());
  endMinute = parseInt(endMinute) < 10 ? `0${endMinute}` : `${endMinute}`;
  const endAMPM = endHour >= 12 ? 'PM' : 'AM';

  const dayPrefix =
    startDayOfMonth === 1
      ? 'st'
      : startDayOfMonth === 2
        ? 'nd'
        : startDayOfMonth === 3
          ? 'rd'
          : 'th';

  return `${startDay}, ${startDayOfMonth}${dayPrefix} ${startMonth} ${startYear}, ${startHour}:${startMinute} ${startAMPM} to ${endHour}:${endMinute} ${endAMPM}`;
};

export const createMeeting = async (
  startTime: string,
  expiryTime: string,
  user: string
) => {
  const api = new API({
    apiKey: env.HUDDLE01_API_KEY,
  });

  const data = await api.createRoom({
    title: `Meeting with ${user}`,
    hostWallets: [ETH_ADDRESS],
    startTime,
    expiryTime,
    roomType: 'VIDEO',
  });

  if (data.error) throw data.error;

  const roomDetails = await api.getRoomDetails({
    roomId: data.data.data.roomId,
  });

  if (roomDetails.error) throw roomDetails.error;

  return roomDetails.data;
};

export const getRoom = async () => {
  const api = new API({
    apiKey: env.HUDDLE01_API_KEY,
  });

  const data = await api.getRoomMeetings({
    roomId: 'oop-ogpp-jge',
  });

  const live = await api.getRooms();
};
