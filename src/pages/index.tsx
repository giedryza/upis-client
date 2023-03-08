import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';

import { routes } from 'config';
import { getParameters } from 'schemas';
import { AppHead } from 'ui';
import { SerpResults } from 'components/serp';
import { getLoaders, toursKeys } from 'domain/tours';

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
  const filters = getParameters(routes.home).parse(query);

  await Promise.all([
    queryClient.prefetchInfiniteQuery(toursKeys.list(filters), () =>
      loaders.getTours({ req, params: filters })
    ),
    queryClient.prefetchQuery(toursKeys.list('filters', 'summary'), () =>
      loaders.getFiltersSummary({ req })
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
