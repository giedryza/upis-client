import { NextRequest, NextResponse } from 'next/server';

import { routes } from 'config/routes';
import { redirectMiddleware } from 'tools/services/middlewares';

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname === routes.redirect) {
    return redirectMiddleware(req);
  }

  return NextResponse.next();
};
