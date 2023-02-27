import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { LabeledValue } from 'ui';
import { generateUrl } from 'tools/common';

export const Contacts: FC = () => {
  const { t } = useTranslation();

  const { data: provider } = useActiveProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.contacts.title')}
      icon="contacts"
      actions={[
        {
          as: 'link',
          href: generateUrl(routes.account.providers.one.contacts, {
            id: provider._id,
          }),
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
