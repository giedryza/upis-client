import { FC, ReactNode } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Button } from 'ui/button/button.component';
import { IconName } from 'ui/icon';

import styles from './edit-block.module.scss';

interface Props {
  id: string;
  form: ReactNode;
  onCancel?: () => void;
  onDelete?: () => void;
  isValid?: boolean;
}

const EditBlock: FC<Props> = ({
  id,
  form,
  onCancel,
  onDelete,
  isValid = true,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {form}

      <div className={styles.actions}>
        <div className={styles.secondaryActions}>
          {onDelete && (
            <Button
              label={t('common:actions.delete')}
              icon={IconName.Trash}
              variant="link"
              size="sm"
              attributes={{
                onClick: onDelete,
              }}
            />
          )}
        </div>

        <div className={styles.primaryActions}>
          {onCancel && (
            <Button
              label={t('common:actions.cancel')}
              variant="ghost-dark"
              size="sm"
              attributes={{
                onClick: onCancel,
              }}
            />
          )}

          <Button
            label={t('common:actions.save')}
            variant="primary"
            size="sm"
            attributes={{
              type: 'submit',
              form: id,
              disabled: !isValid,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { EditBlock };
