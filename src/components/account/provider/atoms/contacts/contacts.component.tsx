import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { FieldDisplay } from 'ui';

export const Contacts: VFC = () => {
  const { t } = useTranslation();

  const { data: provider } = useActiveProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.contacts.title')}
      icon="phone"
      actions={[
        {
          url: routes.account.providers.one.contacts.replace(
            ':id',
            provider._id
          ),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <FieldDisplay
        label={t('account:providers.contacts.form.email.label')}
        value={provider.email}
      />
      <FieldDisplay
        label={t('account:providers.contacts.form.phone.label')}
        value={provider.phone}
      />
      <FieldDisplay
        label={t('account:providers.contacts.form.website.label')}
        value={provider.website}
      />
    </InfoBlock>
  );
};
