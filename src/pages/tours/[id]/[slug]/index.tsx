import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

import { AppHead } from 'ui';
import { TourDetails } from 'components/tour';

const TourPage: NextPage = () => {
  return (
    <>
      <AppHead />

      <TourDetails />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default TourPage;
