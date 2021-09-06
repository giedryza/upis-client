import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { companiesActions } from 'domain/companies/companies.actions';
import { getMyCompany } from 'domain/companies/companies.thunks';

export const useMyCompany = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyCompany());

    return () => {
      dispatch(companiesActions.clearCompany());
    };
  }, [dispatch]);
};
