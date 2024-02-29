import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import { normalize } from 'viem/ens';

import { env } from '~/env';

export const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
  },
});

import { getEnsAddress } from '@wagmi/core';

export const getAddress = async (name: string): Promise<string | null> => {
  if (name.endsWith('.eth')) {
    const ensAddress = await getEnsAddress(config, {
      name: normalize(name),
    });

    return ensAddress ?? null;
  } else if (RegExp(/^0x[a-fA-F0-9]{40}$/gm).test(name)) {
    return name;
  } else {
    return null;
  }
};
