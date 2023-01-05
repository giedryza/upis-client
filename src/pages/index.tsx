import { GetServerSideProps, NextPage } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { getSession } from 'next-auth/react';

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
  locale,
}) => {
  const session = await getSession({ req });

  const queryClient = new QueryClient();
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(toursKeys.list('filters', 'summary'), () =>
    loaders.getFiltersSummary()
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
