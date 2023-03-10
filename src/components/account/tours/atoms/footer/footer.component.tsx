import { useRouter } from 'next/router';
import { FC } from 'react';

import { Pagination } from 'ui';
import { useMyTours } from 'domain/tours';
import { generateUrl } from 'tools/common';
import { constructUrlWithQuery } from 'tools/services/url';
import { routes } from 'config';

import styles from './footer.module.scss';

export const ToursFooter: FC = () => {
  const { query } = useRouter();

  const { data: tours } = useMyTours();

  return (
    <div className={styles.footer}>
      <div />

      {tours?.meta && tours.meta.pages > 1 ? (
        <Pagination
          currentPage={tours.meta.page}
          totalPages={tours.meta.pages}
          onLink={(page) =>
            constructUrlWithQuery(routes.account.tours.index, generateUrl, {
              query: { ...query, page },
            })
          }
        />
      ) : (
        <div />
      )}
    </div>
  );
};
