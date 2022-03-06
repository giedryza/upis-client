import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { routes } from 'config/routes';
import { IconName } from 'ui';
import { InfoBlock, InfoItem } from 'components/account/atoms';

import styles from './profile.module.scss';

export const Profile: VFC = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  return (
    <div className={styles.content}>
      <InfoBlock title={t('account:general.title')} icon={IconName.Gear}>
        <InfoItem
          label={t('account:general.form.email.label')}
          value={session?.user?.email ?? '-'}
        />
      </InfoBlock>

      <InfoBlock
        title={t('account:security.title')}
        icon={IconName.Lock}
        editPage={routes.account.profile.security}
      >
        <InfoItem
          label={t('account:security.form.password.label')}
          value={t('account:security.form.password.placeholder')}
        />
      </InfoBlock>
    </div>
  );
};
