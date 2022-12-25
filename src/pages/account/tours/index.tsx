import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dehydrate, QueryClient } from 'react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config/routes';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { Tours } from 'components/account';
import { getLoaders, ToursFilters, toursKeys } from 'domain/tours';
import { generateUrl } from 'tools/common';

const ToursPage: NextPage = () => {
  const { t } = useTranslation();

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 2 })} />

      <MainLayout>
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
  locale,
}) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: generateUrl(routes.home),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const filters: Partial<ToursFilters> = { user: session.user.id };
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(toursKeys.list(filters), () =>
    loaders.getTours({ params: filters })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ToursPage;
