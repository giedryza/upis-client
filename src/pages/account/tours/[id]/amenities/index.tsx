import { NextPage, GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { generateRoute, getRouteParam } from 'tools/common';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { TourEditAmenities } from 'components/account';
import { toursKeys, getLoaders } from 'domain/tours';

const TourEditAmenitiesPage: NextPage = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const id = getRouteParam(query.id);

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 1 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateRoute(routes.account.profile.index),
              },
              {
                label: t('account:tours.title', { count: 2 }),
                url: generateRoute(routes.account.tours.index),
              },
              {
                label: id,
                url: generateRoute(routes.account.tours.one.index, { id }),
              },
              {
                label: t('account:tours.amenities.title'),
              },
            ]}
          />

          <AccountLayout>
            <TourEditAmenities />
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
        destination: generateRoute(routes.home),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const id = getRouteParam(params?.id);
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(toursKeys.detail(id), () =>
    loaders.getTour({ req, id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default TourEditAmenitiesPage;
