import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { Button, Container, Card, Divider } from 'ui';

import { Props } from './forgot-sent.types';
import styles from './forgot-sent.module.scss';

export const PasswordForgotSent: VFC<Props> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <Container size="xs">
      <Card>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {t('auth:passwordForgot.sent.title')}
          </h1>

          <p className={styles.text}>
            {t('auth:passwordForgot.sent.instructions')}
          </p>

          <Divider label={t('common:texts.or')} />

          <Button
            label={t('auth:passwordForgot.sent.actions.retry')}
            variant="primary"
            width="full"
            attributes={{
              onClick: onRetry,
            }}
          />

          <div className={styles.footer}>
            <span>{t('auth:signin.texts.not-have-account')}</span>
            <Button
              label={t('auth:actions.signup')}
              variant="link"
              size="xs"
              url={routes.auth.signup}
            />
          </div>
        </div>
      </Card>
    </Container>
  );
};
