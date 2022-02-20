import { NextPage } from 'next';

import { Modal } from 'components/modal/modal.component';
import { AppHead } from 'ui/app-head/app-head.component';
import { FileInput } from 'ui/file-input/file-input.component';

const Home: NextPage = () => {
  return (
    <div
      style={{
        padding: 50,
      }}
    >
      <AppHead />
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <Modal />
      <FileInput accept={['jpg', 'png', 'jpeg']} multiple name="logo" />
    </div>
  );
};

export default Home;
