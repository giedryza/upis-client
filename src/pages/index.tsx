import { GetServerSideProps, NextPage } from 'next';
// import { dehydrate, QueryClient } from '@tanstack/react-query';
import { getServerSession } from 'next-auth/next';

// import { routes } from 'config';
import { authOptions } from 'tools/services';
import { AppHead } from 'ui';
import { SerpResults } from 'components/serp';
// import { getLoaders, toursKeys } from 'domain/tours';

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
  res,
  // query,
  // locale,
}) => {
  const session = await getServerSession(req, res, authOptions);

  // const queryClient = new QueryClient();

  // try {
  //   const { loaders } = getLoaders(locale);
  //   // const filters = getQueryParams(routes.home, query);

  //   await Promise.all([
  //     queryClient.prefetchInfiniteQuery(toursKeys.list(filters), () =>
  //       loaders.getTours({ params: filters })
  //     ),
  //     queryClient.prefetchQuery(toursKeys.list('filters', 'summary'), () =>
  //       loaders.getFiltersSummary()
  //     ),
  //   ]);
  // } catch (error) {
  //   console.error(error);
  // }

  return {
    props: {
      session,
      // TODO: remove when solution is found
      // https://github.com/TanStack/query/issues/1458
      // dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

export default Home;
