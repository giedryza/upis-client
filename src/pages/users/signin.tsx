import { NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';

import { MainLayout } from 'layouts/main/main.layout';
import { Signin } from 'components/users/signin/signin.component';
import { AppHead } from 'ui/app-head/app-head.component';

const SigninPage: NextPage = () => {
  const { t } = useTranslation();

  return (
    <MainLayout>
      <AppHead title={t('users:layout.signin')} />
      <Signin />
    </MainLayout>
  );
};

export default SigninPage;
