import { useRef, VFC } from 'react';
import Link from 'next/link';
import { useBreadcrumbItem } from 'react-aria';

import { Props } from './breadcrumb-item.types';
import styles from './breadcrumb-item.module.scss';

export const BreadcrumbItem: VFC<Props> = ({
  isCurrent,
  label,
  url = '/',
  heading: Heading = 'h1',
}) => {
  const ref = useRef(null);

  const { itemProps } = useBreadcrumbItem(
    {
      elementType: isCurrent ? Heading : 'a',
      isCurrent,
      children: label,
    },
    ref
  );

  const breadcrumbContent = isCurrent ? (
    <Heading {...itemProps} className={styles.heading} ref={ref}>
      {label}
    </Heading>
  ) : (
    <Link href={url}>
      <a {...itemProps} className={styles.link} ref={ref}>
        {label}
      </a>
    </Link>
  );

  return <li className={styles.item}>{breadcrumbContent}</li>;
};
