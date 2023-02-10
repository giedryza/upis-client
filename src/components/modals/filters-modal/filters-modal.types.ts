import { ModalProps } from 'domain/modal';
import { ToursFilters } from 'domain/tours';

export interface Values {
  amenities: ToursFilters['amenities'];
  regions: ToursFilters['regions'];
  rivers: ToursFilters['rivers'];
  days: [ToursFilters['daysFrom'], ToursFilters['daysTo']];
  duration: [ToursFilters['durationFrom'], ToursFilters['durationFrom']];
  distance: [ToursFilters['distanceFrom'], ToursFilters['distanceFrom']];
  difficulty: [ToursFilters['difficultyFrom'], ToursFilters['difficultyFrom']];
  providers: ToursFilters['providers'];
}

export interface Props extends ModalProps {
  closeModal: (
    param?:
      | { action: 'CLOSE' }
      | { action: 'APPLY'; payload: Partial<ToursFilters> }
  ) => void;
}
