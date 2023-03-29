import { IncomingMessage } from 'http';

export type AppRequest = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};
