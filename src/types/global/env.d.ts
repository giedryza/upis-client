import { z } from 'zod';

import { envVariables } from '../../../env.validator';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
