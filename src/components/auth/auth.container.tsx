import { FC, useEffect } from 'react';

import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { useAuthContext } from 'domain/auth/auth.context';
import { endpoints } from 'uri/endpoints';
import { Session } from 'domain/auth/auth.types';
import { authActions } from 'domain/auth/auth.actions';
import { isSessionExpired } from 'domain/auth/auth.selectors';

const Auth: FC = ({ children }) => {
  const { authDispatch, authState } = useAuthContext();
  const { timestamp } = authState;

  const isExpired = isSessionExpired(authState);

  useEffect(() => {
    const getMe = async () => {
      const { data } = await new Http<Response<Session>>(
        endpoints.users.me
      ).get();

      authDispatch(authActions.setSession(data));
    };

    if (!timestamp || isExpired) {
      getMe();
    }
  }, [authDispatch, timestamp, isExpired]);

  return <>{children}</>;
};

export { Auth };
