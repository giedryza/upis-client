import { NextPage } from 'next';

import { MainLayout } from 'layouts/main/main.layout';
import { Signin } from 'components/users/signin/signin.component';

const SigninPage: NextPage = () => {
  return (
    <MainLayout>
      <Signin />
    </MainLayout>
  );
};

export default SigninPage;
