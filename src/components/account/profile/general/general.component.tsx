import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Breadcrumbs, IconName } from 'ui';
import { InfoBlock } from 'components/account/atoms';

import styles from './general.module.scss';

export const General: VFC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <Breadcrumbs
        items={[
          {
            label: t('account:title'),
            url: routes.account.profile.index,
          },
          {
            label: t('account:profile.title'),
            url: routes.account.profile.index,
          },
          {
            label: t('account:profile.subtitle.general'),
          },
        ]}
      />

      <InfoBlock
        title={t('account:profile.subtitle.general')}
        icon={IconName.Gear}
      >
        general
      </InfoBlock>
    </div>
  );
};
