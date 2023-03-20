import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'layouts';
import { AppHead } from 'ui';
import { PageNotFound } from 'components/errors';

const Custom404: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <AppHead title={t('common:errors.page_not_found.title')} />

      <MainLayout>
        <PageNotFound />
      </MainLayout>
    </>
  );
};

export default Custom404;
