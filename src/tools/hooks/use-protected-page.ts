import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { routes } from 'config';
import { generateUrl } from 'tools/services/url';
import { Role } from 'domain/users';

export const useProtectedPage = (roles: Role[]) => {
  const { push } = useRouter();

  const { status, data: session } = useSession();

  useEffect(() => {
    if (status !== 'authenticated') {
      push(generateUrl(routes.home));

      return;
    }

    if (!roles.includes(session.user.role)) {
      push(generateUrl(routes.account.profile.index));
    }
  }, [status, push, roles, session?.user.role]);
};
