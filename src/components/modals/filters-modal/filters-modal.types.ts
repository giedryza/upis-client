import { ModalProps } from 'domain/modal';
import { ToursFilters } from 'domain/tours';

export interface Values {
  amenities: NonNullable<ToursFilters['amenities']>;
  regions: NonNullable<ToursFilters['regions']>;
  rivers: NonNullable<ToursFilters['rivers']>;
  days: [
    NonNullable<ToursFilters['daysFrom']>,
    NonNullable<ToursFilters['daysTo']>
  ];
  duration: [
    NonNullable<ToursFilters['durationFrom']>,
    NonNullable<ToursFilters['durationTo']>
  ];
  distance: [
    NonNullable<ToursFilters['distanceFrom']>,
    NonNullable<ToursFilters['distanceTo']>
  ];
  difficulty: [
    NonNullable<ToursFilters['difficultyFrom']>,
    NonNullable<ToursFilters['difficultyTo']>
  ];
  providers: NonNullable<ToursFilters['providers']>;
}

export interface Props extends ModalProps {
  closeModal: (
    param?:
      | { action: 'CLOSE' }
      | { action: 'APPLY'; payload: Partial<ToursFilters> }
  ) => void;
}
