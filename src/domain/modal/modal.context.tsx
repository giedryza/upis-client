import { useMemo, useCallback, useState, FC, PropsWithChildren } from 'react';
import { nanoid } from 'nanoid';

import { Modal } from 'ui';
import { contextFactory } from 'tools/common';

import { PromiseResolvePayload, ModalProps } from './modal.types';

interface ModalContext {
  openModal: <Props extends ModalProps>(options: {
    component: FC<Props>;
    props?: Omit<Props, 'closeModal'>;
  }) => Promise<
    | NonNullable<Parameters<Props['closeModal']>[0]>
    | PromiseResolvePayload<'CLOSE'>
  >;
  closeModal: (data?: PromiseResolvePayload<'CLOSE'>) => void;
}

interface ModalOptions {
  id: string;
  component: FC<any>;
  props?: { [key: string]: unknown };
  resolve: (data: PromiseResolvePayload<'CLOSE'>) => void;
}

const [useModalContext, ModalContextProvider] = contextFactory<ModalContext>();

export const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modals, setModals] = useState<ModalOptions[]>([]);

  const openModal = useCallback<ModalContext['openModal']>(
    ({ component, props }) => {
      return new Promise((resolve) => {
        setModals((prev) => [
          ...prev,
          { component, props, resolve, id: nanoid(10) },
        ]);
      });
    },
    []
  );

  const closeModal = useCallback<ModalContext['closeModal']>((data) => {
    setModals((prev) => {
      prev.at(-1)?.resolve(data || { action: 'CLOSE' });

      return prev.slice(0, -1);
    });
  }, []);

  const value = useMemo(
    () => ({ openModal, closeModal }),
    [closeModal, openModal]
  );

  return (
    <ModalContextProvider value={value}>
      {children}

      {modals.map((modal) => {
        const CustomModal = modal.component;

        return (
          <Modal
            id={modal.id}
            onClose={() => closeModal({ action: 'CLOSE' })}
            isOpen
            key={modal.id}
          >
            <CustomModal {...modal.props} closeModal={closeModal} />
          </Modal>
        );
      })}
    </ModalContextProvider>
  );
};

export { useModalContext };
