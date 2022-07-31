import { VFC } from 'react';
import { useBreadcrumbs } from 'react-aria';

import { BreadcrumbItem } from './atoms';
import { Props } from './breadcrumbs.types';
import styles from './breadcrumbs.module.scss';

export const Breadcrumbs: VFC<Props> = ({ items, heading }) => {
  const breadcrumbItems = items.map((item, i) => (
    <BreadcrumbItem
      url={item.url}
      label={item.label}
      isCurrent={i + 1 === items.length}
      heading={heading}
      key={item.label}
    />
  ));

  const { navProps } = useBreadcrumbs({});

  return (
    <nav {...navProps} className={styles.breadcrumbs}>
      <ol className={styles.list}>{breadcrumbItems}</ol>
    </nav>
  );
};
