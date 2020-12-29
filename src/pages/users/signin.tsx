import { NextPage } from 'next';

import { MainLayout } from 'layouts/main/main.layout';
import { Signin } from 'components/users/signin/signin.component';
import { AppHead } from 'ui/app-head/app-head.component';

const SigninPage: NextPage = () => {
  return (
    <MainLayout>
      <AppHead />
      <Signin />
    </MainLayout>
  );
};

export default SigninPage;
