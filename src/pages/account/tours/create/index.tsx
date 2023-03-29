import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getServerSession } from 'next-auth/next';

import { routes } from 'config';
import { useProtectedPage } from 'tools/hooks';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AppHead, Breadcrumbs } from 'ui';
import { AccountNavigation, TourCreate } from 'components/account';
import { authOptions, generateUrl } from 'tools/services';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  locale,
  defaultLocale,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: `${
          locale === defaultLocale ? '' : `/${locale}`
        }${generateUrl(routes.auth.signin)}`,
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

const ToursCreatePage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage(['manager', 'admin']);

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 1 })} />

      <MainLayout>
        <AccountNavigation />

        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateUrl(routes.account.profile.index),
              },
              {
                label: t('account:tours.title', { count: 2 }),
                url: generateUrl(routes.account.tours.index),
              },
              {
                label: t('common:actions.create'),
              },
            ]}
          />

          <AccountLayout>
            <TourCreate />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default ToursCreatePage;
