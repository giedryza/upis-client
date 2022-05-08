import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { modal } from 'domain/modal';

import { confirm } from './confirm.slice';
import { selectConfirm } from './confirm.selectors';

export const useConfirm = () => {
  const dispatch = useDispatch();

  const { cancel } = useSelector(selectConfirm);

  const confirmation = (prompt: string): Promise<{ confirmed: boolean }> => {
    const promise = new Promise<void>((resolve, reject) => {
      dispatch(modal.actions.open('confirmation'));

      dispatch(confirm.actions.setPrompt(prompt));
      dispatch(confirm.actions.setProceed(resolve));
      dispatch(confirm.actions.setCancel(reject));
    });

    return promise
      .then(() => ({ confirmed: true }))
      .catch(() => ({ confirmed: false }))
      .finally(() => dispatch(modal.actions.close()));
  };

  useEffect(() => {
    return () => {
      cancel?.();
    };
  }, [cancel]);

  return {
    confirmation,
  };
};
