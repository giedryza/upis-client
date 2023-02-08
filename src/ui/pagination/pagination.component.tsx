import { FC } from 'react';
import Link from 'next/link';

import { usePaginationRange } from 'tools/hooks';
import { Icon } from 'ui';

import { Props } from './pagination.types';
import styles from './pagination.module.scss';

export const Pagination: FC<Props> = ({ totalPages, currentPage, onLink }) => {
  const { range } = usePaginationRange({ totalPages, currentPage });

  if (range.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="pagination" className={styles.pagination}>
      <ul className={styles.list}>
        {currentPage === 1 ? null : (
          <li>
            <Link
              href={onLink(currentPage - 1)}
              className={styles.link}
              aria-label="Previous page"
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
                      'aria-label': `Page ${page}`,
                      'aria-current': 'page',
                    }
                  : {})}
              >
                {page}
                {page === currentPage ? null : (
                  <span className="visually-hidden" key={page}>
                    page
                  </span>
                )}

                {page === 1 ? (
                  <span className="visually-hidden">(first page)</span>
                ) : null}
                {page === range.at(-1) ? (
                  <span className="visually-hidden">(last page)</span>
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
              aria-label="Next page"
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
