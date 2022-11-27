import { useRef, FC } from 'react';
import Link from 'next/link';
import { useBreadcrumbItem } from 'react-aria';

import { Props } from './breadcrumb-item.types';
import styles from './breadcrumb-item.module.scss';

export const BreadcrumbItem: FC<Props> = ({
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
    <Link {...itemProps} href={url} className={styles.link} ref={ref}>
      {label}
    </Link>
  );

  return <li className={styles.item}>{breadcrumbContent}</li>;
};
