import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { routes } from 'config/routes';
import { generateRoute } from 'tools/common';

export const useGuestPage = () => {
  const { push } = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status !== 'unauthenticated') {
      push(generateRoute(routes.home));
    }
  }, [status, push]);
};
