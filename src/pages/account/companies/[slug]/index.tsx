import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { Companies, CompanyEdit } from 'components/account';
import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';
import { CompaniesFilters } from 'domain/companies/companies.types';
import { capitalizeFirstLetter } from 'tools/common/capitalizeFirstLetter';

const CompanyEditPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  const { query } = useRouter();

  return (
    <>
      <AppHead title={t('account:companies.title')} />

      <MainLayout>
        <AccountPageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              {
                label: t('account:companies.title'),
                url: routes.account.companies.index,
              },
              {
                label: capitalizeFirstLetter(
                  (query.slug as string).split('-').join(' ')
                ),
                url: routes.account.companies.index,
              },
            ]}
          />

          <AccountLayout>
            <CompanyEdit />
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

  // const queryClient = new QueryClient();
  // const filters: CompaniesFilters = { user: session.user.id };

  // await queryClient.prefetchQuery(companiesKeys.list(filters), () =>
  //   adapters.getCompanies({ params: filters })
  // );

  return {
    props: {
      session,
      // dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CompanyEditPage;
