import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Breadcrumbs } from 'ui';

import styles from './tours.module.scss';

export const Tours: VFC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <Breadcrumbs
        items={[
          { label: t('account:title'), url: routes.account.profile.index },
          { label: t('account:tours.title') },
        ]}
      />
    </div>
  );
};
