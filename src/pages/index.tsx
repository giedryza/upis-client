import { NextPage } from 'next';

import { AppHead } from 'ui';
import { MainLayout } from 'layouts';
import { useAppDispatch } from 'tools/services/store';
import { alerts } from 'domain/alerts';

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
              alerts.actions.open({
                type: 'warning',
                message:
                  'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem, tempora.',
              })
            );
          }}
        >
          TOAST
        </button>
      </MainLayout>
    </>
  );
};

export default Home;
