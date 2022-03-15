import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { capitalizeFirstLetter } from 'tools/common/capitalize-first-letter';
import { getRouteParam } from 'tools/common/get-route-param';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, AccountPageLayout } from 'layouts';
import { CompanyEditSocialLinksAdd } from 'components/account';
import { companiesKeys } from 'domain/companies/companies.keys';
import { adapters } from 'domain/companies/companies.adapters';

const CompanyEditSocialLinksAddPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const slug = getRouteParam(query.slug);

  useProtectedPage();

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
                label: capitalizeFirstLetter(slug.split('-').join(' ')),
                url: routes.account.companies.one.index.replace(':slug', slug),
              },
              {
                label: t('account:companies.socialLinks.title'),
              },
            ]}
          />

          <AccountLayout>
            <CompanyEditSocialLinksAdd />
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

export default CompanyEditSocialLinksAddPage;
