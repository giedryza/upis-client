import { GetServerSideProps, NextPage } from 'next';
import { getServerSession } from 'next-auth/next';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { getQueryParams, generateUrl, authOptions } from 'tools/services';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AccountNavigation, Tours } from 'components/account';
import { getLoaders, toursKeys } from 'domain/tours';

const ToursPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage(['manager', 'admin']);

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 2 })} />

      <MainLayout>
        <AccountNavigation />

        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateUrl(routes.account.profile.index),
              },
              { label: t('account:tours.title', { count: 2 }) },
            ]}
          />

          <AccountLayout>
            <Tours />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
  locale,
}) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: generateUrl(routes.home),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const { loaders } = getLoaders(locale);
  const filters = getQueryParams(routes.home, query);

  await queryClient.prefetchQuery(
    toursKeys.list({ ...filters, user: session.user.id }),
    () =>
      loaders.getTours({ req, params: { ...filters, user: session.user.id } })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ToursPage;
