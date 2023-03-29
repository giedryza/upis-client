import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';

import { authOptions } from 'tools/services';

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions);
};
