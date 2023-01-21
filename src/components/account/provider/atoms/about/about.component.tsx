import { FC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveProvider } from 'domain/providers';
import { routes } from 'config/routes';
import { LabeledValue } from 'ui';
import { generateUrl } from 'tools/common';
import { formatLanguage, formatList } from 'tools/format';

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
          url: generateUrl(routes.account.providers.one.about, {
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
        value={formatList(
          lang,
          provider.languages.map((language) => formatLanguage(lang, language))
        )}
      />
      <LabeledValue
        label={t('account:providers.about.form.boats.display')}
        value={formatList(
          lang,
          provider.boats.map((boat) => t(`common:boats.${boat}`))
        )}
      />
    </InfoBlock>
  );
};
