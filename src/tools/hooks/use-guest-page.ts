import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { routes } from 'config/routes';

export const useGuestPage = () => {
  const { push } = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status !== 'unauthenticated') {
      push(routes.home);
    }
  }, [status, push]);
};
