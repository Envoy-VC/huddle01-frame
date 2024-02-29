export enum PAGE {
  HOME = 1,
  DATE_SELECT = 2,
  CONFIRM = 3,
  SUCCESS = 4,
  ERROR = -1,
}

export type FarcasterSocial = {
  fnames: string[];
  followerCount: number;
  followingCount: number;
  identity: string;
  isDefault: boolean;
  profileImage: string;
};

export type AirstackResponse<T> = {
  Wallet: {
    socials: T[];
  };
};

export type State = {
  page: PAGE;
  date: string[] | null;
  error: string | null;
};

export type Schedule = {
  address: string;
  time_zone: string;
  max_duration: number;
  email: string;
  availability: string[];
};
