import { useRouter } from 'next/router';
import { FC } from 'react';

import { Pagination } from 'ui';
import { useMyProviders } from 'domain/providers';
import { constructUrlWithQuery, generateUrl } from 'tools/services';
import { routes } from 'config';

import styles from './footer.module.scss';

export const ProvidersFooter: FC = () => {
  const { query } = useRouter();

  const { data: providers } = useMyProviders();

  return (
    <div className={styles.footer}>
      <div />
      {providers?.meta && providers.meta.pages > 1 ? (
        <Pagination
          currentPage={providers.meta.page}
          totalPages={providers.meta.pages}
          onLink={(page) =>
            constructUrlWithQuery(routes.account.providers.index, generateUrl, {
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
