import { Env } from 'types/common';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
