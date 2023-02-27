import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Modal } from 'ui';

import { Props } from './confirmation-modal.types';

export const ConfirmationModal: FC<Props> = ({ prompt, closeModal }) => {
  const { t } = useTranslation();

  return (
    <Modal.Content
      title={t('common:components.confirm.title')}
      actions={[
        {
          as: 'button',
          label: t('common:actions.cancel'),
          variant: 'ghost',
          onClick: () => closeModal({ action: 'CLOSE' }),
        },
        {
          as: 'button',
          label: t('common:actions.yes'),
          variant: 'primary',
          onClick: () => closeModal({ action: 'CONFIRM' }),
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
