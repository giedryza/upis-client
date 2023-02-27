import { Boat } from 'domain/providers';
import { Region, River } from 'domain/tours';

export interface Props {
  regions: Region[];
  rivers: River[];
  difficulty: number;
  distance: number;
  duration: number;
  days: number;
  boats: Boat[];
}
