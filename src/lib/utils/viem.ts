import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

import { env } from '~/env';

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(env.ALCHEMY_RPC_URL),
});

export const getAddress = async (name: string): Promise<string | null> => {
  if (name.endsWith('.eth')) {
    const ensAddress = await publicClient.getEnsAddress({
      name: normalize(name),
    });

    return ensAddress ?? null;
  } else if (RegExp(/^0x[a-fA-F0-9]{40}$/gm).test(name)) {
    return name;
  } else {
    return null;
  }
};
