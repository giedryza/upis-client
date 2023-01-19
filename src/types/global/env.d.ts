import { z } from 'zod';

const nodeEnv = ['production', 'development', 'test'] as const;

const envVariables = z.object({
  NODE_ENV: z.enum(nodeEnv),
  NEXT_PUBLIC_HOST_CLIENT: z.string(),
  NEXT_PUBLIC_HOST_API: z.string(),
  NEXTAUTH_URL: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_JWT_EXPIRES_IN_DAYS: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
