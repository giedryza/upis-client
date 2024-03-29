import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { APP, routes } from 'config';
import { useActiveTour, useTours } from 'domain/tours';
import { Button } from 'ui';
import { SerpCard } from 'components/serp';
import { useBreakpoints } from 'tools/hooks';
import { generateUrl } from 'tools/services';

import { Props } from './tours.types';
import styles from './tours.module.scss';

export const BodyTours: FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { xs } = useBreakpoints();

  const { data: session } = useSession();
  const { data: tour } = useActiveTour();
  const { data: tours } = useTours({
    filters: { limit: 3, providers: [id], populate: ['photos'] },
  });

  const heightRatio = xs ? 2.25 : 1;

  if (!tours?.meta?.total || !tour) return null;

  return (
    <section
      className={styles.section}
      style={{
        '--height': heightRatio * APP.serp.card.image.height,
      }}
    >
      <h2 className={styles.title}>
        {t('tours:details.tours.title', { provider: tour.provider.name })}
      </h2>

      <ul className={styles.list}>
        {tours.items.map((item) => (
          <li className={styles.card} key={item._id}>
            <SerpCard tour={item} userId={session?.user.id} />
          </li>
        ))}
      </ul>

      {tours.meta.total > 3 ? (
        <Button
          as="link"
          label={t('tours:actions.view_all')}
          variant="outline"
          size="xs"
          href={{
            pathname: generateUrl(routes.home),
            query: { providers: [id] },
          }}
          shallow
        />
      ) : null}
    </section>
  );
};
