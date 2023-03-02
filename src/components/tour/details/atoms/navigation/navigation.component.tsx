import { FC } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { Button, Container } from 'ui';
import { useActiveTour } from 'domain/tours';
import { generateUrl } from 'tools/common';
import { routes } from 'config';

import styles from './navigation.module.scss';

export const DetailsNavigation: FC = () => {
  const { t } = useTranslation();
  const { back } = useRouter();

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

          <ul className={styles.actions}>
            {session && session.user.id === tour?.user ? (
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
          </ul>
        </div>
      </Container>
    </nav>
  );
};
