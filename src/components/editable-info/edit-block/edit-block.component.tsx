import { FC, ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';

import styles from './edit-block.module.scss';

import { Button } from 'ui/button/button.component';

interface Props {
  id: string;
  form: ReactNode;
  onCancel?: () => void;
  isValid?: boolean;
}

const EditBlock: FC<Props> = ({ id, form, onCancel, isValid = true }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {form}

      <div className={styles.actions}>
        {onCancel && (
          <Button
            label={t('common:actions.cancel')}
            styleType="ghost-dark"
            size="sm"
            attributes={{
              onClick: onCancel,
            }}
          />
        )}

        <Button
          label={t('common:actions.save')}
          styleType="primary"
          size="sm"
          attributes={{
            type: 'submit',
            form: id,
            disabled: !isValid,
          }}
        />
      </div>
    </div>
  );
};

export { EditBlock };
