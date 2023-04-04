import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { dehydrate, DehydratedState, QueryClient } from '@tanstack/react-query';
import useTranslation from 'next-translate/useTranslation';

import { routes } from 'config';
import { getRouteParams, generateUrl, authOptions } from 'tools/services';
import { useProtectedPage } from 'tools/hooks';
import { AppHead, Breadcrumbs } from 'ui';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import {
  AccountNavigation,
  ProviderEditAmenitiesEdit,
} from 'components/account';
import { amenitiesKeys, getLoaders } from 'domain/amenities';

interface Props {
  session: Session;
  dehydratedState: DehydratedState;
  params: { id: string; amenityId: string };
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
  const { id, amenityId } = getRouteParams(
    routes.account.providers.one.amenities.one,
    params
  );
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(amenitiesKeys.detail(amenityId), () =>
    loaders.getAmenity({ id: amenityId })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
      params: { id, amenityId },
    },
  };
};

const ProviderEditAmenitiesEditPage: NextPage<
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
              {
                label: params.id,
                url: generateUrl(routes.account.providers.one.index, {
                  id: params.id,
                }),
              },
              {
                label: t('account:providers.amenities.title'),
              },
            ]}
          />

          <AccountLayout>
            <ProviderEditAmenitiesEdit />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default ProviderEditAmenitiesEditPage;
