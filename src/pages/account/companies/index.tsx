import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { Companies } from 'components/account';
import { companiesKeys, loaders, CompaniesFilters } from 'domain/companies';

const CompaniesPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:companies.title', { count: 2 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              { label: t('account:companies.title', { count: 2 }) },
            ]}
          />

          <AccountLayout>
            <Companies />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: routes.home,
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const filters: CompaniesFilters = { user: session.user.id };

  await queryClient.prefetchQuery(companiesKeys.list(filters), () =>
    loaders.getCompanies({ params: filters })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CompaniesPage;
