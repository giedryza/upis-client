import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import Trans from 'next-translate/Trans';

import { routes } from 'config';
import { generateUrl } from 'tools/common';
import { Button, Container, Card } from 'ui';

import { Props } from './forgot-sent.types';
import styles from './forgot-sent.module.scss';

export const PasswordForgotSent: FC<Props> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {t('auth:passwordForgot.sent.title')}
          </h1>

          <p className={styles.text}>
            <Trans
              i18nKey="auth:passwordForgot.sent.instructions"
              components={[
                <Button
                  as="button"
                  label={t(
                    'auth:passwordForgot.sent.actions.retry'
                  ).toLowerCase()}
                  size="sm"
                  variant="link"
                  onClick={onRetry}
                  key="retry"
                />,
              ]}
            />
          </p>

          <div className={styles.footer}>
            <span>{t('auth:signin.texts.not-have-account')}</span>
            <Button
              as="link"
              label={t('auth:actions.signup')}
              variant="link"
              size="xs"
              href={generateUrl(routes.auth.signup)}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};
