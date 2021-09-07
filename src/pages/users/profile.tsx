import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'components/layouts/main/main.layout';
import { Profile } from 'components/users/profile/profile.component';
import { AppHead } from 'ui/app-head/app-head.component';
import { AccountContainer } from 'components/users/account-container/account-container.component';
import { reduxStore } from 'utils/libs/store/store.lib';
import { getSession } from 'domain/auth/auth.thunks';
import { Dispatch } from 'types/common/redux';

const ProfilePage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <AppHead title={t('users:profile.title')} />

      <AccountContainer>
        <Profile />
      </AccountContainer>
    </MainLayout>
  );
};

export const getServerSideProps = reduxStore.wrapper.getServerSideProps(
  async (context) => {
    const dispatch = context.store.dispatch as Dispatch;

    await dispatch(getSession(context.req));
  }
);

export default ProfilePage;
