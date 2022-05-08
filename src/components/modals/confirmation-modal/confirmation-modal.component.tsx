import { useEffect, VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import { Modal } from 'ui';
import { confirm, selectConfirm } from 'domain/confirm';

export const ConfirmationModal: VFC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { prompt, proceed, cancel } = useSelector(selectConfirm);

  useEffect(() => {
    return () => {
      dispatch(confirm.actions.reset());
    };
  }, [dispatch]);

  return (
    <Modal.Content
      title={t('common:components.confirm.title')}
      actions={[
        {
          label: t('common:actions.cancel'),
          variant: 'ghost',
          attributes: {
            onClick: () => cancel?.(),
          },
        },
        {
          label: t('common:actions.yes'),
          variant: 'primary',
          attributes: {
            onClick: () => proceed?.(),
          },
        },
      ]}
    >
      {prompt}
    </Modal.Content>
  );
};
