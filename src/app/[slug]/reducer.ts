import type { FrameReducer } from 'frames.js/next/types';

import { formatDate } from '~/lib/utils';

import { type State, PAGE } from '~/types';

export const reducer: FrameReducer<State> = (state, action) => {
  const buttonIndex = action.postBody?.untrustedData?.buttonIndex;
  const { page } = state;

  if (page === PAGE.HOME) {
    return {
      page: PAGE.DATE_SELECT,
      date: null,
      error: null,
    };
  } else if (page === PAGE.DATE_SELECT) {
    const date = action.postBody?.untrustedData?.inputText;

    if (buttonIndex === 1) {
      return {
        page: PAGE.HOME,
        date: null,
        error: null,
      };
    }

    try {
      if (!date) throw new Error('Invalid date format');
      const formattedDate = formatDate(date);
      console.log('Formatted Date: ', formattedDate);
      return {
        page: PAGE.CONFIRM,
        date: formattedDate,
        error: 'Invalid date format',
      };
    } catch (error: unknown) {
      return {
        page: PAGE.ERROR,
        date: null,
        error: String((error as Error).message),
      };
    }
  } else if (page === PAGE.CONFIRM) {
    return {
      page: buttonIndex === 1 ? PAGE.DATE_SELECT : PAGE.SUCCESS,
      date: state.date,
      error: null,
    };
  } else if (page === PAGE.ERROR) {
    return {
      page: PAGE.HOME,
      date: null,
      error: null,
    };
  } else if (page === PAGE.SUCCESS) {
    return {
      page: PAGE.HOME,
      date: state.date,
      error: null,
    };
  } else {
    return {
      page: 1,
      date: null,
      error: null,
    };
  }
};
