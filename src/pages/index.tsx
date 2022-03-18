import { NextPage } from 'next';

import { Modal } from 'components/modal/modal.component';
import { AppHead } from 'ui';

const Home: NextPage = () => {
  return (
    <div
      style={{
        padding: 50,
      }}
    >
      <AppHead />

      <Modal />
    </div>
  );
};

export default Home;
