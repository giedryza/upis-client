import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { routes } from 'config';
import { LabeledValue } from 'ui';
import { generateUrl } from 'tools/common';

export const Security: FC = () => {
  const { t } = useTranslation();

  return (
    <InfoBlock
      title={t('account:profile.security.title')}
      icon="lock"
      actions={[
        {
          url: generateUrl(routes.account.profile.security),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <LabeledValue
        label={t('account:profile.security.form.password.label')}
        value={t('account:profile.security.form.password.placeholder')}
      />
    </InfoBlock>
  );
};
