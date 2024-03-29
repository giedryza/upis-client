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
import { AccountNavigation, TourEditGalleryEdit } from 'components/account';
import { imagesKeys, getLoaders } from 'domain/images';

interface Props {
  session: Session;
  dehydratedState: DehydratedState;
  params: { id: string; imageId: string };
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
  const { id, imageId } = getRouteParams(
    routes.account.tours.one.gallery.one,
    params
  );
  const { loaders } = getLoaders(locale);

  await queryClient.prefetchQuery(imagesKeys.detail(imageId), () =>
    loaders.getImage({ id: imageId })
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
      params: { id, imageId },
    },
  };
};

const TourEditGalleryEditPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ params }) => {
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
                label: params.id,
                url: generateUrl(routes.account.tours.one.index, {
                  id: params.id,
                }),
              },
              {
                label: t('account:tours.gallery.title'),
              },
            ]}
          />

          <AccountLayout>
            <TourEditGalleryEdit />
          </AccountLayout>
        </PageLayout>
      </MainLayout>
    </>
  );
};

export default TourEditGalleryEditPage;
