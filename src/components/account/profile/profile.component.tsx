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
      <InfoBlock
        title={t('account:profile.subtitle.general')}
        icon={IconName.Gear}
        editPage={routes.account.profile.general}
      >
        <InfoItem
          label={t('account:form.email')}
          value={session?.user?.email ?? '-'}
        />
        <InfoItem
          label={t('account:form.password')}
          value={Array.from({ length: 8 }).fill('\u2217').join('')}
        />
      </InfoBlock>
    </div>
  );
};