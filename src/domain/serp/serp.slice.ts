import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SerpView } from './serp.types';

interface SerpState {
  view: SerpView;
  active: string;
}

const initialState: SerpState = {
  view: 'list',
  active: '',
};

export const serp = createSlice({
  name: 'serp',
  initialState,
  reducers: {
    setView: (state, { payload }: PayloadAction<SerpView>) => {
      state.view = payload;
    },
    setActive: (state, { payload }: PayloadAction<string>) => {
      state.active = payload;
    },
  },
});
