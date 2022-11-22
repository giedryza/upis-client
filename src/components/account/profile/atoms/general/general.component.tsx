import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { InfoBlock } from 'components/account/atoms';
import { LabeledValue } from 'ui';

export const General: VFC = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();

  return (
    <InfoBlock title={t('account:profile.general.title')} icon="gear">
      <LabeledValue
        label={t('account:profile.general.form.email.label')}
        value={session?.user?.email ?? '-'}
      />
    </InfoBlock>
  );
};
