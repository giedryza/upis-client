import { ModalProps } from 'domain/modal';
import { TourFilters } from 'domain/tours';

export interface Values {
  amenities: TourFilters['amenities'];
  regions: TourFilters['regions'];
  rivers: TourFilters['rivers'];
  days: [number, number];
  duration: [number, number];
  distance: [number, number];
  difficulty: [number, number];
}

export interface Props extends ModalProps {
  closeModal: (
    param?:
      | { action: 'CLOSE' }
      | { action: 'APPLY'; payload: Partial<TourFilters> }
  ) => void;
}
