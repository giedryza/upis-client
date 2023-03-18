import { GetServerSideProps, NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { getSession } from 'next-auth/react';

import { routes } from 'config';
import { useProtectedPage } from 'tools/hooks';
import { MainLayout, AccountLayout, PageLayout } from 'layouts';
import { AppHead, Breadcrumbs } from 'ui';
import { TourCreate } from 'components/account';
import { generateUrl } from 'tools/services';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale,
  defaultLocale,
}) => {
  const session = await getSession({ req });

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

  useProtectedPage();

  return (
    <>
      <AppHead title={t('account:tours.title', { count: 1 })} />

      <MainLayout>
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
