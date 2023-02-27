import { Tour } from 'domain/tours';

export interface Props {
  departure: Tour['departure'];
  arrival: Tour['departure'];
}
