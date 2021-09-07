import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isSessionExpired } from 'domain/auth/auth.selectors';
import { State } from 'types/common/redux';
import { getSession } from 'domain/auth/auth.thunks';

const Auth: FC = ({ children }) => {
  const dispatch = useDispatch();

  const timestamp = useSelector((state: State) => state.auth.timestamp);
  const isExpired = useSelector(isSessionExpired);

  useEffect(() => {
    if (!timestamp || isExpired) {
      dispatch(getSession());
    }
  }, [dispatch, timestamp, isExpired]);

  return <>{children}</>;
};

export { Auth };
