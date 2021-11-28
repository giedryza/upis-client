import { NextPage } from 'next';

import { Modal } from 'components/modal/modal.component';
import { AppHead } from 'ui/app-head/app-head.component';
import { FileInput } from 'ui/file-input/file-input.component';

const Home: NextPage = () => {
  return (
    <div>
      <AppHead />
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <h1>next</h1>
      <FileInput
        accept={['image/*']}
        onChange={(files) => console.log(files)}
        // filetype="image/png"
        // filename="company-logo.png"
        attributes={{
          name: 'logo',
          placeholder: 'drop files here',
        }}
      />
      <Modal />
    </div>
  );
};

export default Home;
