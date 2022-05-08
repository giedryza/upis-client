import { NextPage } from 'next';

import { AppHead } from 'ui';
import { MainLayout } from 'layouts';
import { useAppDispatch } from 'tools/services/store';
import { notifications } from 'domain/notifications';
import { useConfirm } from 'domain/confirm';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  const { confirmation } = useConfirm();

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
          TOAST
        </button>

        <button
          type="button"
          onClick={async () => {
            const { confirmed } = await confirmation(
              'Are you sure you want to delete company 111-222-333?'
            );

            if (confirmed) {
              console.log('SUCCESS');
            }
          }}
        >
          CONFIRMATION
        </button>
      </MainLayout>
    </>
  );
};

export default Home;
