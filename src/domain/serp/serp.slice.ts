import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SerpView } from './serp.types';

interface SerpState {
  view: SerpView;
}

const initialState: SerpState = {
  view: 'list',
};

export const serp = createSlice({
  name: 'serp',
  initialState,
  reducers: {
    setView: (state, { payload }: PayloadAction<SerpView>) => {
      state.view = payload;
    },
  },
});
