import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { routes } from 'config/routes';
import { Container, ImagePlaceholder, ImageTile } from 'ui';
import { generateUrl } from 'tools/common';

export const Logo: FC = () => {
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
          url: generateUrl(routes.account.providers.one.logo, {
            id: provider._id,
          }),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <Container size="xs" align="left">
        {provider.logo.location ? (
          <ImageTile
            image={provider.logo.location}
            alt="logo"
            objectFit="contain"
            sizes={{ width: 400, height: 225 }}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </Container>
    </InfoBlock>
  );
};
