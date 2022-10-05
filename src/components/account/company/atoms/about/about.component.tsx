import { VFC } from 'react';
import useTranslation from 'next-translate/useTranslation';

import { InfoBlock } from 'components/account/atoms';
import { useActiveCompany } from 'domain/companies';
import { routes } from 'config/routes';
import { FieldDisplay } from 'ui';

export const About: VFC = () => {
  const { t, lang } = useTranslation();

  const { data: company } = useActiveCompany();

  if (!company) return null;

  return (
    <InfoBlock
      title={t('account:companies.about.title')}
      icon="info"
      columns={1}
      actions={[
        {
          url: routes.account.companies.one.about.replace(':id', company._id),
          label: t('common:actions.edit'),
          variant: 'tertiary',
          icon: 'pencil',
        },
      ]}
    >
      <FieldDisplay
        label={t('account:companies.about.form.name.label')}
        value={company.name}
      />
      <FieldDisplay
        label={t('account:companies.about.form.description.label')}
        value={company.description}
      />
      <FieldDisplay
        label={t('account:companies.about.form.languages.display')}
        value={new Intl.ListFormat(lang, {
          style: 'long',
          type: 'conjunction',
        }).format(
          company.languages.map(
            (language) =>
              new Intl.DisplayNames([lang], { type: 'language' }).of(
                language
              ) as string
          )
        )}
      />
      <FieldDisplay
        label={t('account:companies.about.form.boats.display')}
        value={new Intl.ListFormat(lang, {
          style: 'long',
          type: 'conjunction',
        }).format(company.boats.map((boat) => t(`common:boats.${boat}`)))}
      />
    </InfoBlock>
  );
};
