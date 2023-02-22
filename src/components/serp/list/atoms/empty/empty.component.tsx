import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { Container, EmptyState } from 'ui';

import styles from './empty.module.scss';

export const ListEmpty: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Container size="xs">
        <EmptyState
          title={t('serp:list.empty.title')}
          message={t('serp:list.empty.description')}
          action={{
            as: 'link',
            label: t('serp:actions.clear-filters'),
            href: { query: {} },
            shallow: true,
          }}
          icon="path"
        />
      </Container>
    </div>
  );
};
