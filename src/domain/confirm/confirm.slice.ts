import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Reject, Resolve } from 'types/common';

interface ConfirmState {
  prompt: string;
  proceed: Resolve | null;
  cancel: Reject | null;
}

const initialState: ConfirmState = {
  prompt: '',
  proceed: null,
  cancel: null,
};

export const confirm = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    setPrompt: (state, { payload }: PayloadAction<string>) => {
      state.prompt = payload;
    },
    setProceed: (state, { payload }: PayloadAction<Resolve>) => {
      state.proceed = payload;
    },
    setCancel: (state, { payload }: PayloadAction<Reject>) => {
      state.cancel = payload;
    },
    reset: (state) => {
      state.prompt = initialState.prompt;
      state.proceed = initialState.proceed;
      state.cancel = initialState.cancel;
    },
  },
});
