import React, { VFC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from 'ui';
import { modal, selectIsModalActive } from 'domain/modal';

import { Props } from './modal-slot.types';

export const ModalSlot: VFC<Props> = ({ modalName, slot }) => {
  const dispatch = useDispatch();

  const isOpen = useSelector(selectIsModalActive(modalName));

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
