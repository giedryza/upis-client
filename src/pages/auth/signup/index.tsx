import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { useGuestPage } from 'tools/hooks';
import { AppHead } from 'ui';
import { Signup } from 'components/auth';
import { PageLayout, MainLayout } from 'layouts';
import { generateUrl } from 'tools/common';

const SignupPage: NextPage = () => {
  const { t } = useTranslation();

  useGuestPage();

  return (
    <>
      <AppHead title={t('auth:signup.title')} />

      <MainLayout>
        <PageLayout>
          <Signup />
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: generateUrl(routes.home),
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default SignupPage;
