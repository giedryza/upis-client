import { FC } from 'react';

import { Portal } from 'ui/portal/portal.component';
import { useModalContext } from 'domain/modal/modal.context';
import { ModalKey } from 'domain/modal/modal.types';
import { modalActions } from 'domain/modal/modal.actions';

const Modal: FC = () => {
  const { modalState, modalDispatch } = useModalContext();

  return (
    <>
      <h1>active modal: {modalState.activeModal}</h1>
      <button
        type="button"
        onClick={() => {
          modalDispatch(modalActions.setActiveModal(ModalKey.TestModal));
        }}
      >
        Open Modal
      </button>
      {modalState.activeModal === ModalKey.TestModal && (
        <Portal selector="#modal">
          <div className="backdrop">
            <div className="modal">
              <p>This modal is rendered using portals</p>
              <button
                type="button"
                onClick={() => {
                  modalDispatch(modalActions.setActiveModal(null));
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
      )}
    </>
  );
};

export { Modal };
