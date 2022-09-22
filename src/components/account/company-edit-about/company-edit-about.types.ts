import { Boat } from 'domain/companies';
import { Language } from 'types/common';

export interface Values {
  name: string;
  description: string;
  languages: Language[];
  boats: Boat[];
}
