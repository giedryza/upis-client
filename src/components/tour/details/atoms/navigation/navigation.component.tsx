import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { Button, Container } from 'ui';
import { routes } from 'config';
import { generateUrl } from 'tools/services';
import { useActiveTour } from 'domain/tours';
import { useFavoritesContext } from 'domain/favorites';

import styles from './navigation.module.scss';

export const DetailsNavigation: FC = () => {
  const { t } = useTranslation();
  const { back } = useRouter();

  const { favorites, addToFavorites, removeFromFavorites } =
    useFavoritesContext();

  const { data: session } = useSession();
  const { data: tour } = useActiveTour();

  return (
    <nav className={styles.nav}>
      <Container>
        <div className={styles.container}>
          <Button
            as="button"
            label={t('common:actions.back')}
            icon="chevron-left"
            variant="ghost"
            size="xs"
            onClick={back}
          />

          {tour ? (
            <ul className={styles.actions}>
              {session && session.user.id === tour.user ? (
                <li>
                  <Button
                    as="link"
                    label={t('common:actions.edit')}
                    icon="pencil"
                    size="xs"
                    variant="ghost"
                    href={generateUrl(routes.account.tours.one.index, {
                      id: tour._id,
                    })}
                  />
                </li>
              ) : null}
              <li>
                {favorites.includes(tour._id) ? (
                  <Button
                    as="button"
                    label={t('common:layout.secondary_nav.saved')}
                    // TODO: replace with filled heart icon
                    icon="heart"
                    size="xs"
                    variant="ghost"
                    onClick={() => removeFromFavorites(tour._id)}
                  />
                ) : (
                  <Button
                    as="button"
                    label={t('common:actions.save')}
                    icon="heart"
                    size="xs"
                    variant="ghost"
                    onClick={() => addToFavorites(tour._id)}
                  />
                )}
              </li>
            </ul>
          ) : null}
        </div>
      </Container>
    </nav>
  );
};
