import React, { VFC } from 'react';

import { useAppDispatch, useAppSelector } from 'tools/services/store';
import { Modal } from 'ui';
import { modal, selectIsModalActive } from 'domain/modal';

import { Props } from './modal-slot.types';

export const ModalSlot: VFC<Props> = ({ modalName, slot }) => {
  const dispatch = useAppDispatch();

  const isOpen = useAppSelector(selectIsModalActive(modalName));

  return isOpen ? (
    <Modal
      id={modalName}
      isOpen={isOpen}
      onClose={() => {
        dispatch(modal.actions.close());
      }}
    >
      {slot}
    </Modal>
  ) : null;
};
