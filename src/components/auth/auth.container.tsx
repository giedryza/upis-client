import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isSessionExpired } from 'domain/auth/auth.selectors';
import { State } from 'types/common/redux';
import { thunks } from 'domain/thunks';

const Auth: FC = ({ children }) => {
  const dispatch = useDispatch();

  const timestamp = useSelector((state: State) => state.auth.timestamp);
  const isExpired = useSelector(isSessionExpired);

  useEffect(() => {
    if (!timestamp || isExpired) {
      dispatch(thunks.auth.getSession());
    }
  }, [dispatch, timestamp, isExpired]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export { Auth };
