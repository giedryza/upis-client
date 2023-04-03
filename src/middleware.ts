import { NextRequest, NextResponse } from 'next/server';

import { routes } from 'config';
import { redirect } from 'tools/services';

export const config: Record<'matcher', Array<typeof routes.redirect>> &
  Record<string, any> = {
  matcher: ['/redirect'],
  unstable_allowDynamic: [
    '/node_modules/axe-core/axe.js',
    '/node_modules/@babel/runtime/regenerator/index.js',
    '/node_modules/@cloudinary/transformation-builder-sdk/internal/utils/cloneDeep.js',
    '/node_modules/@cloudinary/url-gen/internal/utils/cloneDeep.js',
  ],
};

export const middleware = async ({ nextUrl }: NextRequest) => {
  const url = redirect(nextUrl);

  if (url) {
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};
