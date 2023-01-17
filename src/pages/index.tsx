import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';

import { AppHead } from 'ui';
import { SerpResults } from 'components/serp';
import { getLoaders, toursKeys, converters } from 'domain/tours';

const Home: NextPage = () => {
  return (
    <>
      <AppHead />

      <SerpResults />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
  locale,
}) => {
  const session = await getSession({ req });

  const queryClient = new QueryClient();
  const { loaders } = getLoaders(locale);

  const filters = await loaders
    .getActiveFilters({ params: query })
    .then(converters.getActiveFilters);

  await Promise.all([
    queryClient.prefetchInfiniteQuery(toursKeys.list(filters), () =>
      loaders.getTours({ params: filters })
    ),
    queryClient.prefetchQuery(toursKeys.list('filters', 'summary'), () =>
      loaders.getFiltersSummary()
    ),
    queryClient.prefetchQuery(toursKeys.list('filters', 'active', query), () =>
      loaders.getActiveFilters({ params: query })
    ),
  ]);

  return {
    props: {
      session,
      // TODO: remove when solution is found
      // https://github.com/TanStack/query/issues/1458
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
