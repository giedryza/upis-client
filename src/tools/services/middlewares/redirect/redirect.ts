import { NextRequest, NextResponse } from 'next/server';

import { routes } from 'config/routes';

const REDIRECT_LOCATIONS: Record<string, { route: string }> = {
  'password-reset': {
    route: routes.auth.passwordReset,
  },
};

const REDIRECT_KEY = 'location' as const;

export const redirectMiddleware = ({ nextUrl }: NextRequest) => {
  if (!nextUrl.searchParams.has(REDIRECT_KEY)) {
    return NextResponse.next();
  }

  const location = nextUrl.searchParams.get(REDIRECT_KEY);

  if (!location) {
    return NextResponse.next();
  }

  const url = nextUrl.clone();
  const redirectLocation = REDIRECT_LOCATIONS[location];

  if (!redirectLocation) {
    url.pathname = routes.home;
    url.search = '';

    return NextResponse.redirect(url);
  }

  url.pathname = redirectLocation.route;
  url.searchParams.delete(REDIRECT_KEY);

  return NextResponse.redirect(url);
};
