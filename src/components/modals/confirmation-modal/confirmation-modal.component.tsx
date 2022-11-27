import { useEffect, FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { useAppDispatch, useAppSelector } from 'tools/services/store';
import { Modal } from 'ui';
import { confirm, selectConfirm } from 'domain/confirm';

export const ConfirmationModal: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { prompt, proceed, cancel } = useAppSelector(selectConfirm);

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
      <p
        dangerouslySetInnerHTML={{
          __html: prompt,
        }}
      />
    </Modal.Content>
  );
};
