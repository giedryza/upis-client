import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { Providers } from 'components/account';
import { providersKeys, getLoaders, ProvidersFilters } from 'domain/providers';
import { generateRoute } from 'tools/common';

const ProvidersPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:providers.title', { count: 2 })} />

      <MainLayout>
        <PageLayout>
          <Breadcrumbs
            items={[
              {
                label: t('account:title'),
                url: generateRoute(routes.account.profile.index),
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
  locale,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: generateRoute(routes.home),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const filters: ProvidersFilters = { user: session.user.id };
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(providersKeys.list(filters), () =>
    loaders.getProviders({ params: filters })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ProvidersPage;
