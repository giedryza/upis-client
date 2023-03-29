import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { authOptions, generateUrl } from 'tools/services';
import { useGuestPage } from 'tools/hooks';
import { AppHead } from 'ui';
import { Signup } from 'components/auth';
import { PageLayout, MainLayout } from 'layouts';

const SignupPage: NextPage = () => {
  const { t } = useTranslation();

  useGuestPage();

  return (
    <>
      <AppHead title={t('auth:signup.title')} />

      <MainLayout>
        <PageLayout>
          <main id="main">
            <Signup />
          </main>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

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
