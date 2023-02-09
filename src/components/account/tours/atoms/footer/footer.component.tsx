import { useRouter } from 'next/router';
import { FC } from 'react';

import { Pagination } from 'ui';
import { useToursActiveFilters } from 'domain/tours';

import styles from './footer.module.scss';

export const ToursFooter: FC = () => {
  const { query } = useRouter();

  const { data: filters } = useToursActiveFilters();

  return (
    <div className={styles.footer}>
      <div />
      {filters ? (
        <Pagination
          currentPage={filters.page ?? 1}
          totalPages={20}
          onLink={(page) => ({ query: { ...query, page } })}
        />
      ) : (
        <div />
      )}
    </div>
  );
};
