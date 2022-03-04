import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { IconName } from 'ui';
import { InfoBlock } from 'components/account/atoms';

import styles from './general.module.scss';

export const General: VFC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <InfoBlock
        title={t('account:profile.subtitle.general')}
        icon={IconName.Gear}
      >
        general
      </InfoBlock>
    </div>
  );
};
