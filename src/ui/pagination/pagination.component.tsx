import { FC } from 'react';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';

import { usePaginationRange } from 'tools/hooks';
import { Icon } from 'ui';

import { Props } from './pagination.types';
import styles from './pagination.module.scss';

export const Pagination: FC<Props> = ({
  totalPages,
  currentPage,
  onLink,
  siblingCount = 1,
}) => {
  const { t } = useTranslation();
  const { range } = usePaginationRange({
    totalPages,
    currentPage,
    siblingCount,
  });

  if (range.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={t('common:components.pagination.title')}
      className={styles.pagination}
    >
      <ul className={styles.list}>
        {currentPage === 1 ? null : (
          <li>
            <Link
              href={onLink(currentPage - 1)}
              className={styles.link}
              aria-label={t('common:components.pagination.prev')}
              shallow
            >
              <Icon
                name="chevron-left"
                className={styles.icon}
                focusable={false}
                aria-hidden
              />
            </Link>
          </li>
        )}

        {range.map((page, i) => (
          <li key={i}>
            {Number.isNaN(page) ? (
              <>&#8230;</>
            ) : (
              <Link
                href={onLink(page)}
                className={styles.link}
                shallow
                {...(page === currentPage
                  ? {
                      'aria-label': `${page} ${t(
                        'common:components.pagination.page'
                      )}`,
                      'aria-current': 'page',
                    }
                  : {})}
              >
                {page}
                {page === currentPage ? null : (
                  <span className="visually-hidden" key={page}>
                    {t('common:components.pagination.page')}
                  </span>
                )}

                {page === 1 ? (
                  <span className="visually-hidden">
                    ({t('common:components.pagination.first')})
                  </span>
                ) : null}
                {page === range.at(-1) ? (
                  <span className="visually-hidden">
                    ({t('common:components.pagination.last')})
                  </span>
                ) : null}
              </Link>
            )}
          </li>
        ))}

        {currentPage === range.at(-1) ? null : (
          <li>
            <Link
              href={onLink(currentPage + 1)}
              className={styles.link}
              aria-label={t('common:components.pagination.next')}
              shallow
            >
              <Icon
                name="chevron-right"
                className={styles.icon}
                focusable={false}
                aria-hidden
              />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
