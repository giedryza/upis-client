import { NextPage } from 'next';

import { AppHead } from 'ui';
import { MainLayout } from 'layouts';

const Home: NextPage = () => {
  return (
    <>
      <AppHead />

      <MainLayout>
        <div />
      </MainLayout>
    </>
  );
};

export default Home;
