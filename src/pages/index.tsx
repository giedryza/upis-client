import { NextPage } from 'next';

import { AppHead } from 'ui';
import { MainLayout } from 'layouts';
import { useAppDispatch } from 'tools/libs/store';
import { notifications } from 'domain/notifications';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <>
      <AppHead />

      <MainLayout>
        <div />
        <button
          type="button"
          onClick={() => {
            dispatch(
              notifications.actions.open({
                type: 'warning',
                message:
                  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, tempora.',
              })
            );
          }}
        >
          PUSH
        </button>
      </MainLayout>
    </>
  );
};

export default Home;
