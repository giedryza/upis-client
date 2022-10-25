import { AppState } from 'tools/services/store';

export const selectLightbox = (state: AppState): AppState['lightbox'] =>
  state.lightbox;
