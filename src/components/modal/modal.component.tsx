import { FC } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { Portal } from 'ui';

const Modal: FC = () => {
  // const dispatch = useDispatch();

  // const activeModal = useSelector((state: State) => state.modal.activeModal);

  return (
    <>
      <h1>active modal: </h1>
      <button
        type="button"
        onClick={() => {
          // dispatch(actions.modal.setActiveModal(ModalKey.TestModal));
        }}
      >
        Open Modal
      </button>
      {/* {'activeModal' === ModalKey.TestModal && ( */}
      <Portal selector="#modal">
        <div className="backdrop">
          <div className="modal">
            <p>This modal is rendered using portals</p>
            <button
              type="button"
              onClick={() => {
                // dispatch(actions.modal.setActiveModal(null));
              }}
            >
              Close Modal
            </button>
          </div>
          <style jsx>
            {`
              :global(body) {
                overflow: hidden;
              }
              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }
              .modal {
                background-color: white;
                position: absolute;
                top: 10%;
                right: 10%;
                bottom: 10%;
                left: 10%;
                padding: 1em;
              }
            `}
          </style>
        </div>
      </Portal>
      {/* )} */}
    </>
  );
};

export { Modal };
