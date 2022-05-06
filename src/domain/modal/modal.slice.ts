import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalName } from './modal.types';

interface ModalState {
  activeModal: ModalName | null;
}

const initialState: ModalState = {
  activeModal: null,
};

export const modal = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    open: (state, { payload }: PayloadAction<ModalName>) => {
      state.activeModal = payload;
    },
    close: (state) => {
      state.activeModal = null;
    },
  },
});
