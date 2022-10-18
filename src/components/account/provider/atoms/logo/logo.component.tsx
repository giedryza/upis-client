import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { ImageItem, InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { routes } from 'config/routes';

export const Logo: VFC = () => {
  const { t } = useTranslation();

  const { data: provider } = useActiveProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.logo.title')}
      icon="picture"
      columns={1}
      actions={[
        {
          url: routes.account.providers.one.logo.replace(':id', provider._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <ImageItem src={provider.logo.location} />
    </InfoBlock>
  );
};
