import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import useTranslation from 'next-translate/useTranslation';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';

import { routes } from 'config';
import { getRouteParams, generateUrl, authOptions } from 'tools/services';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AccountNavigation, Provider } from 'components/account';
import { providersKeys, getLoaders } from 'domain/providers';

interface Props {
  session: Session;
  dehydratedState: DehydratedState;
  params: { id: string };
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  params,
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
  const { id } = getRouteParams(routes.account.providers.one.index, params);
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(providersKeys.detail(id), () =>
    loaders.getProvider({ id })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
      params: { id },
    },
  };
};

const ProviderPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ params }) => {
  const { t } = useTranslation();

  useProtectedPage(['manager', 'admin']);

  return (
    <>
      <AppHead title={t('account:providers.title', { count: 1 })} />

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
                label: t('account:providers.title', { count: 2 }),
                url: generateUrl(routes.account.providers.index),
              },
              { label: params.id },
            ]}
          />

          <AccountLayout>
            <Provider />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default ProviderPage;
