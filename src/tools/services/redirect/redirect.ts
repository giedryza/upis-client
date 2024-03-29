import { NextRequest } from 'next/server';

import { routes } from 'config';

const REDIRECT_LOCATIONS: Record<string, { route: string }> = {
  'password-reset': {
    route: routes.auth.password.reset,
  },
  'verify-email': {
    route: routes.auth.email.verify,
  },
};

const REDIRECT_KEY = 'location' as const;

export const redirect = (nextUrl: NextRequest['nextUrl']): URL | null => {
  if (nextUrl.pathname !== routes.redirect) {
    return null;
  }

  if (!nextUrl.searchParams.has(REDIRECT_KEY)) {
    return null;
  }

  const location = nextUrl.searchParams.get(REDIRECT_KEY);

  if (!location) {
    return null;
  }

  const redirectLocation = REDIRECT_LOCATIONS[location];

  if (!redirectLocation) {
    return null;
  }

  const url = nextUrl.clone();

  url.pathname = redirectLocation.route;
  url.searchParams.delete(REDIRECT_KEY);

  return url;
};
