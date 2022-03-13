import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { capitalizeFirstLetter } from 'tools/common/capitalizeFirstLetter';
import { getRouteParam } from 'tools/common/getRouteParam';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { Company } from 'components/account';
import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';

const CompanyPage: NextPage = () => {
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
                  getRouteParam(query.slug).split('-').join(' ')
                ),
                url: routes.account.companies.index,
              },
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

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
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
  const slug = getRouteParam(params?.slug);

  await queryClient.prefetchQuery(companiesKeys.detail(slug), () =>
    adapters.getCompany({ req, slug })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CompanyPage;
