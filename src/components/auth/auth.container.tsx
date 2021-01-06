import { FC, useEffect } from 'react';

import { Http } from 'utils/libs/http/http.lib';
import { useAuthContext } from 'domain/auth/auth.context';
import { uri } from 'utils/libs/http/http.constants';
import { Session } from 'domain/auth/auth.types';

const Auth: FC = ({ children }) => {
  const { authActions } = useAuthContext();

  useEffect(() => {
    const getMe = async () => {
      const { data } = await new Http<Session | null>(
        uri.endpoints.users.me
      ).get();

      authActions.setSession(data);
    };

    console.log('hey');

    getMe();
  }, []);

  return <>{children}</>;
};

export { Auth };
