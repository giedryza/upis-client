import { Env } from 'types/common/env';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
