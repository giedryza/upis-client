import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { InfoBlock, MapItem } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { LabeledValue } from 'ui';

export const Location: VFC = () => {
  const { t } = useTranslation();

  const { data: provider } = useActiveProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.location.title')}
      icon="pin"
      columns={1}
      actions={[
        {
          url: routes.account.providers.one.location.replace(
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
        label={t('account:providers.location.form.address.label')}
        value={provider.address}
      />

      {!!provider.location.coordinates.length && (
        <MapItem
          markers={[
            {
              lat: provider.location.coordinates[1],
              lng: provider.location.coordinates[0],
            },
          ]}
        />
      )}
    </InfoBlock>
  );
};
