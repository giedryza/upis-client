import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';

import { routes } from 'config';
import { generateUrl, useQueryParams } from 'tools/services';
import { useVerifyEmail } from 'domain/users';

export const EmailVerify: FC = () => {
  const { replace } = useRouter();
  const { token, user } = useQueryParams(routes.auth.email.verify);

  const { mutate: verifyEmail } = useVerifyEmail();

  useEffect(() => {
    if (!token || !user) {
      replace(generateUrl(routes.home));

      return;
    }

    verifyEmail(
      { token, user },
      {
        onSuccess: () => {
          replace(generateUrl(routes.account.profile.index));
        },
        onError: () => {
          replace(generateUrl(routes.home));
        },
      }
    );
  }, [replace, token, user, verifyEmail]);

  return null;
};
