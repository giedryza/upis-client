import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { useSession } from 'next-auth/react';

import { InfoBlock } from 'components/account/atoms';
import { LabeledValue } from 'ui';
import { useSendVerifyEmail } from 'domain/users';

export const General: FC = () => {
  const { t } = useTranslation();

  const { data: session } = useSession();
  const { mutate: sendVerifyEmail, isLoading } = useSendVerifyEmail();

  return (
    <InfoBlock
      title={t('account:profile.general.title')}
      icon="gear"
      actions={[
        ...(session?.user.role === 'pending'
          ? ([
              {
                as: 'button',
                label: t('account:profile.general.actions.verify_email'),
                icon: 'external-link',
                variant: 'outline',
                disabled: isLoading,
                onClick: () => sendVerifyEmail(),
              },
            ] as const)
          : []),
      ]}
    >
      <LabeledValue
        label={t('account:profile.general.form.email.label')}
        value={session?.user?.email ?? '-'}
      />
    </InfoBlock>
  );
};
