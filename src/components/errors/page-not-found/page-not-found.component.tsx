import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { EmptyState } from 'ui';

import styles from './page-not-found.module.scss';

export const PageNotFound: FC = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.container} id="main">
      <EmptyState
        title={t('common:errors.page_not_found.title')}
        message={t('common:errors.page_not_found.message')}
        size="md"
        heading="h1"
        action={{
          as: 'link',
          href: routes.home,
          label: t('common:errors.page_not_found.action'),
        }}
      />
    </main>
  );
};
