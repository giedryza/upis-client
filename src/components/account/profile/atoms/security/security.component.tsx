import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { routes } from 'config/routes';
import { FieldDisplay } from 'ui';

export const Security: VFC = () => {
  const { t } = useTranslation();

  return (
    <InfoBlock
      title={t('account:profile.security.title')}
      icon="lock"
      actions={[
        {
          url: routes.account.profile.security,
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <FieldDisplay
        label={t('account:profile.security.form.password.label')}
        value={t('account:profile.security.form.password.placeholder')}
      />
    </InfoBlock>
  );
};
