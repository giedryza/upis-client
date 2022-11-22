import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { LabeledValue } from 'ui';

export const Contacts: VFC = () => {
  const { t } = useTranslation();

  const { data: provider } = useActiveProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.contacts.title')}
      icon="contacts"
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
      <LabeledValue
        label={t('account:providers.contacts.form.email.label')}
        value={provider.email}
      />
      <LabeledValue
        label={t('account:providers.contacts.form.phone.label')}
        value={provider.phone}
      />
      <LabeledValue
        label={t('account:providers.contacts.form.website.label')}
        value={provider.website}
      />
    </InfoBlock>
  );
};
