import { normalize } from 'viem/ens';
import { getEnsAddress } from '@wagmi/core';

import { config } from '~/providers/web3';

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
