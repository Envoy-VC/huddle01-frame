import type { Metadata } from 'next';
import '~/styles/globals.css';

import { cookieToInitialState } from 'wagmi';
import { config } from '~/providers/web3';
import { Web3Provider } from '~/providers/web3';
import { headers } from 'next/headers';

import { GeistSans } from 'geist/font/sans';
import { cn } from '~/lib/utils';
import { Navbar } from '~/components';

export const metadata: Metadata = {
  title: 'frames.js starter',
  description: '...',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang='en'>
      <body className={cn('font-sans', GeistSans.variable)}>
        <Web3Provider initialState={initialState}>
          <main>
            <Navbar />
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}
