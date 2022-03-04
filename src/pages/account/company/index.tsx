import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { Company } from 'components/account';
import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';

const CompanyPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:company.title')} />

      <MainLayout>
        <AccountPageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              { label: t('account:company.title') },
            ]}
          />

          <AccountLayout>
            <Company />
          </AccountLayout>
        </AccountPageLayout>
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

  await queryClient.prefetchQuery(companiesKeys.detail('me'), () =>
    adapters.getMyCompany({ req })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CompanyPage;
