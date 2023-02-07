import { Values } from './filters-modal.types';

export const FORM_ID = 'filters-modal';

export const INITIAL_VALUES: Values = {
  amenities: [],
  regions: [],
  rivers: [],
  days: [NaN, NaN],
  duration: [NaN, NaN],
  distance: [NaN, NaN],
  difficulty: [NaN, NaN],
};
