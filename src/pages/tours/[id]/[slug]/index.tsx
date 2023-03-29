import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { routes } from 'config';
import { authOptions, getRouteParams } from 'tools/services';
import { AppHead } from 'ui';
import { TourDetails } from 'components/tour';
import { MainLayout } from 'layouts';
import { getLoaders, toursKeys, useActiveTour } from 'domain/tours';

const TourPage: NextPage = () => {
  const { data: tour } = useActiveTour();

  return (
    <>
      <AppHead title={tour?.name} />

      <MainLayout>
        <TourDetails />
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
  locale,
}) => {
  const session = await getServerSession(req, res, authOptions);

  const queryClient = new QueryClient();
  const { id } = getRouteParams(routes.tours.one.index, params);
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

export default TourPage;
