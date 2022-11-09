import { NextPage } from 'next';

import { AppHead } from 'ui';
import { SerpResults } from 'components/serp';

const Home: NextPage = () => {
  return (
    <>
      <AppHead />

      <SerpResults />
    </>
  );
};

export default Home;
