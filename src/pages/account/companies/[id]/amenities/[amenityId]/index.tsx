import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { getRouteParam } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { CompanyEditAmenitiesEdit } from 'components/account';
import { amenitiesKeys, getLoaders } from 'domain/amenities';

const CompanyEditAmenitiesEditPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const id = getRouteParam(query.id);

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:companies.title', { count: 1 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              { label: t('account:title'), url: routes.account.profile.index },
              {
                label: t('account:companies.title', { count: 2 }),
                url: routes.account.companies.index,
              },
              {
                label: id,
                url: routes.account.companies.one.index.replace(':id', id),
              },
              {
                label: t('account:companies.amenities.title'),
              },
            ]}
          />

          <AccountLayout>
            <CompanyEditAmenitiesEdit />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
  locale,
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
  const id = getRouteParam(params?.amenityId);

  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(amenitiesKeys.detail(id), () =>
    loaders.getAmenity({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CompanyEditAmenitiesEditPage;
