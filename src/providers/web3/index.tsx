'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type ReactNode, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';
import { ConnectKitProvider } from 'connectkit';
import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from 'connectkit';

import { env } from '~/env';

export const config = createConfig(
  getDefaultConfig({
    chains: [mainnet],
    transports: {
      [mainnet.id]: http(env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
    },
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNET_PROJECT_ID,
    appName: 'Your App Name',
    appDescription: 'Your App Description',
    appUrl: 'https://family.co',
    appIcon: 'https://family.co/logo.png',
  })
);

export function Web3Provider(props: {
  children: ReactNode;
  initialState?: State;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider theme='soft'>{props.children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
