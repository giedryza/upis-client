import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { IconName } from 'ui';
import { InfoBlock, InfoItem } from 'components/account/atoms';
import { routes } from 'config/routes';

export const Security: VFC = () => {
  const { t } = useTranslation();

  return (
    <InfoBlock
      title={t('account:profile.security.title')}
      icon={IconName.Lock}
      editPage={routes.account.profile.security}
    >
      <InfoItem
        label={t('account:profile.security.form.password.label')}
        value={t('account:profile.security.form.password.placeholder')}
      />
    </InfoBlock>
  );
};
