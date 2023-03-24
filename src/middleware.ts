import { NextRequest, NextResponse } from 'next/server';

import { routes } from 'config';
import { redirect } from 'tools/services';

export const config: Record<'matcher', Array<typeof routes.redirect>> = {
  matcher: ['/redirect'],
};

export const middleware = async ({ nextUrl }: NextRequest) => {
  const url = redirect(nextUrl);

  if (url) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
