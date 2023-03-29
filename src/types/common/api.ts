import { IncomingMessage } from 'http';

export type AppRequest = IncomingMessage & {
  cookies: Partial<{
    [key: string]: string;
  }>;
};

export interface BaseEntity {
  _id: string;
}
