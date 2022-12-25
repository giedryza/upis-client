import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { generateUrl } from 'tools/common';
import { Button, Container, Card } from 'ui';

import styles from './reset-success.module.scss';

export const PasswordResetSuccess: FC = () => {
  const { t } = useTranslation();

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {t('auth:passwordReset.success.title')}
          </h1>

          <Button
            label={t('auth:actions.signin')}
            variant="primary"
            width="full"
            url={generateUrl(routes.auth.signin)}
          />

          <div className={styles.footer}>
            <span>{t('auth:signin.texts.not-have-account')}</span>
            <Button
              label={t('auth:actions.signup')}
              variant="link"
              size="xs"
              url={generateUrl(routes.auth.signup)}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};
