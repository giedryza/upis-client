import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { actions } from 'domain/actions';
import { thunks } from 'domain/thunks';

export const useInitMyCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.companies.getMyCompany());

    return () => {
      dispatch(actions.companies.clearCompany());
    };
  }, [dispatch]);
};
