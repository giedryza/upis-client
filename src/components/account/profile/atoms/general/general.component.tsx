import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { InfoBlock, InfoItem } from 'components/account/atoms';

export const General: VFC = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  return (
    <InfoBlock title={t('account:profile.general.title')} icon="gear">
      <InfoItem
        label={t('account:profile.general.form.email.label')}
        value={session?.user?.email ?? '-'}
      />
    </InfoBlock>
  );
};
