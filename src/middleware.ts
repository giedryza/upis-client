import { NextRequest, NextResponse } from 'next/server';

import { redirect } from 'tools/services';

export const config = {
  matcher: ['/redirect'],
};

export const middleware = async ({ nextUrl }: NextRequest) => {
  const url = redirect(nextUrl);

  if (url) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
