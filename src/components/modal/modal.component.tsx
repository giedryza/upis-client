import { useState } from 'react';

import { Portal } from 'ui/portal/portal.component';

const Modal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Modal
      </button>
      {open && (
        <Portal selector="#modal">
          <div className="backdrop">
            <div className="modal">
              <p>This modal is rendered using portals</p>
              <button type="button" onClick={() => setOpen(false)}>
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
