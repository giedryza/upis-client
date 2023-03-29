import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getServerSession } from 'next-auth/next';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import { routes } from 'config';
import { providersKeys, getLoaders } from 'domain/providers';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AccountNavigation, Providers } from 'components/account';
import { authOptions, generateUrl, getQueryParams } from 'tools/services';

const ProvidersPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage(['manager', 'admin']);

  return (
    <>
      <AppHead title={t('account:providers.title', { count: 2 })} />

      <MainLayout>
        <AccountNavigation />

        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateUrl(routes.account.profile.index),
              },
              { label: t('account:providers.title', { count: 2 }) },
            ]}
          />

          <AccountLayout>
            <Providers />
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
  const filters = getQueryParams(routes.account.providers.index, query);

  await queryClient.prefetchQuery(
    providersKeys.list({ ...filters, user: session.user.id }),
    () =>
      loaders.getProviders({ params: { ...filters, user: session.user.id } })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProvidersPage;
