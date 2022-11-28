import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { routes } from 'config/routes';
import { LabeledValue } from 'ui';
import { generateRoute } from 'tools/common';

export const About: FC = () => {
  const { t, lang } = useTranslation();

  const { data: provider } = useActiveProvider();

  if (!provider) return null;

  return (
    <InfoBlock
      title={t('account:providers.about.title')}
      icon="info"
      columns={1}
      actions={[
        {
          url: generateRoute(routes.account.providers.one.about, {
            id: provider._id,
          }),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <LabeledValue
        label={t('account:providers.about.form.name.label')}
        value={provider.name}
      />
      <LabeledValue
        label={t('account:providers.about.form.description.label')}
        value={provider.description}
      />
      <LabeledValue
        label={t('account:providers.about.form.languages.display')}
        value={new Intl.ListFormat(lang, {
          style: 'long',
          type: 'conjunction',
        }).format(
          provider.languages.map(
            (language) =>
              new Intl.DisplayNames([lang], { type: 'language' }).of(
                language
              ) as string
          )
        )}
      />
      <LabeledValue
        label={t('account:providers.about.form.boats.display')}
        value={new Intl.ListFormat(lang, {
          style: 'long',
          type: 'conjunction',
        }).format(provider.boats.map((boat) => t(`common:boats.${boat}`)))}
      />
    </InfoBlock>
  );
};
