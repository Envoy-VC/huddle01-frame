import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    AIRSTACK_API_KEY: z.string().min(1),
    HUDDLE01_API_KEY: z.string().min(1),
    APPWRITE_PROJECT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_HOST: z.string().min(1),
    NEXT_PUBLIC_ALCHEMY_RPC_URL: z.string().min(1),
    NEXT_PUBLIC_WALLETCONNET_PROJECT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_HOST: process.env.NEXT_PUBLIC_HOST,
    NEXT_PUBLIC_ALCHEMY_RPC_URL: process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL,
    NEXT_PUBLIC_WALLETCONNET_PROJECT_ID:
      process.env.NEXT_PUBLIC_WALLETCONNET_PROJECT_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
