import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Image {
  id: string;
  url: string;
  alt: string;
}

interface LightboxState {
  isOpen: boolean;
  images: Image[];
  currentImage: string;
}

const initialState: LightboxState = {
  isOpen: false,
  images: [],
  currentImage: '',
};

export const lightbox = createSlice({
  name: 'lightbox',
  initialState,
  reducers: {
    open: (
      state,
      { payload }: PayloadAction<{ images: Image[]; currentImage?: string }>
    ) => {
      state.isOpen = true;
      state.images = payload.images;
      state.currentImage = payload.currentImage ?? '';
    },
    close: (state) => {
      state.isOpen = false;
      state.images = [];
      state.currentImage = '';
    },
  },
});
