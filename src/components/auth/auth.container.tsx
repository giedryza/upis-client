import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Http } from 'utils/libs/http/http.lib';
import { Response } from 'utils/libs/http/http.types';
import { endpoints } from 'uri/endpoints';
import { Session } from 'domain/auth/auth.types';
import { authActions } from 'domain/auth/auth.actions';
import { isSessionExpired } from 'domain/auth/auth.selectors';
import { State } from 'utils/libs/store/store.types';

const Auth: FC = ({ children }) => {
  const dispatch = useDispatch();

  const timestamp = useSelector((state: State) => state.auth.timestamp);
  const isExpired = useSelector(isSessionExpired);

  useEffect(() => {
    const getMe = async () => {
      const { data } = await new Http<Response<Session>>(
        endpoints.users.me
      ).get();

      dispatch(authActions.setSession(data));
    };

    if (!timestamp || isExpired) {
      getMe();
    }
  }, [dispatch, timestamp, isExpired]);

  return <>{children}</>;
};

export { Auth };
