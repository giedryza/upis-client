import { AppState } from 'tools/services';

export const selectLightbox = (state: AppState): AppState['lightbox'] =>
  state.lightbox;
