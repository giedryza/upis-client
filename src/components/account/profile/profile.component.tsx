import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { routes } from 'config/routes';
import { Breadcrumbs, IconName } from 'ui';
import { InfoBlock, InfoItem } from 'components/account/atoms';

import styles from './profile.module.scss';

const Profile: FC = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  return (
    <div className={styles.content}>
      <Breadcrumbs
        items={[
          { label: t('account:title'), url: routes.account.profile },
          { label: t('account:profile.title') },
        ]}
      />

      <InfoBlock
        title={t('account:profile.subtitle.general')}
        icon={IconName.Gear}
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

export { Profile };
