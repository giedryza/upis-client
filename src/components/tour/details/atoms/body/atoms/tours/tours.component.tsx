import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { APP } from 'config';
import { useTours } from 'domain/tours';
import { SerpCard } from 'components/serp';
import { useBreakpoints } from 'tools/hooks';

import { Props } from './tours.types';
import styles from './tours.module.scss';

export const BodyTours: FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoints();

  const { data: session } = useSession();
  const { data: tours } = useTours({
    filters: { limit: 3, providers: [id], populate: ['photos'] },
  });

  const heightRatio = xs ? 2.25 : 1;

  if (!tours?.meta?.total) return null;

  return (
    <section
      className={styles.section}
      style={{
        '--height': heightRatio * APP.serp.card.image.height + APP.serp.gridGap,
      }}
    >
      <h2 className={styles.title}>{t('tours:details.tours.title')}</h2>

      <ul className={styles.list}>
        {tours.items.map((tour) => (
          <li className={styles.card} key={tour._id}>
            <SerpCard tour={tour} userId={session?.user.id} />
          </li>
        ))}
      </ul>
    </section>
  );
};
