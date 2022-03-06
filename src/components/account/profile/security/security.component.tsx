import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, IconName, TextInput } from 'ui';
import { InfoBlock } from 'components/account/atoms';

import styles from './security.module.scss';

export const Security: VFC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:security.title')}
        icon={IconName.Gear}
        columns={1}
      >
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <TextInput
              name="currentPassword"
              label={t('account:security.form.currentPassword.label')}
              placeholder={Array.from({ length: 8 }).fill('\u2217').join('')}
            />

            <TextInput
              name="newPassword"
              label={t('account:security.form.newPassword.label')}
              placeholder={Array.from({ length: 8 }).fill('\u2217').join('')}
            />

            <TextInput
              name="confirmPassword"
              label={t('account:security.form.confirmPassword.label')}
              placeholder={Array.from({ length: 8 }).fill('\u2217').join('')}
            />
          </fieldset>

          <div className={styles.actions}>
            <Button
              label={t('common:actions.cancel')}
              variant="secondary"
              size="sm"
              url={routes.account.profile.index}
            />
            <Button
              label={t('common:actions.save')}
              variant="primary"
              size="sm"
              attributes={{
                type: 'submit',
              }}
            />
          </div>
        </form>
      </InfoBlock>
    </div>
  );
};
