import { Company } from 'domain/companies';
import { AppFile, Currency, Language, Price } from 'types/common';

export const regions = [
  'aukstaitija',
  'dzukija',
  'mazoji-lietuva',
  'suvalkija',
  'zemaitija',
] as const;

export const rivers = [
  'agluona_minija',
  'agluona_sesuvis',
  'agluona_vadakstis',
  'aiseta',
  'aiste',
  'aitra',
  'akmena',
  'aknysta',
  'alantas',
  'almaja',
  'alna',
  'alove',
  'alsia',
  'ancia',
  'antvarde',
  'anyksta',
  'apascia',
  'apse',
  'armone',
  'aseka',
  'asva_vadakstis',
  'asva_veivirzas',
  'aunuva',
  'babrungas',
  'baltoji_ancia',
  'bartuva',
  'barupe',
  'bebirva',
  'berze',
  'birveta',
  'blendziava',
  'brazuole',
  'buka',
  'dabikine',
  'dane',
  'darba',
  'daugyvene',
  'dotnuvele',
  'dovine',
  'dringykscia',
  'druksa',
  'dubinga',
  'dubysa',
  'duksta',
  'dysna',
  'ekete',
  'erla',
  'ezeruona',
  'ganse',
  'gauja',
  'gege',
  'graumena',
  'gruda',
  'gryzuva',
  'gyneve',
  'indraja',
  'jara',
  'jiesia',
  'jotija',
  'juoda',
  'juosta',
  'jura',
  'kamoja',
  'kamona',
  'kena',
  'kertusa',
  'kiauna',
  'kirksnove',
  'kirsinas',
  'kirsna',
  'klaipedos_kanalas',
  'krazante',
  'kretuona',
  'kriauna',
  'kruoja',
  'kupa',
  'kviste',
  'lakaja',
  'lankesa',
  'lapainia',
  'lapise',
  'laukesa',
  'laukysta',
  'leite',
  'letausas',
  'levuo',
  'liaude',
  'ligaja',
  'linkava',
  'lokys',
  'lokysta',
  'lomena',
  'lukna',
  'lukne',
  'luoba',
  'lusis',
  'mera_kuna',
  'merkys',
  'mincia',
  'minija',
  'misupe',
  'mituva',
  'musa',
  'muse',
  'musia',
  'nedzingis',
  'nemunas',
  'nemunelis',
  'neris',
  'neveza',
  'nevezis',
  'nieda',
  'nova',
  'obelis',
  'pala',
  'patekla',
  'pelysa',
  'perseke',
  'persoksna',
  'pilve',
  'pisa',
  'plastaka',
  'pyvesa',
  'ratnycia',
  'rauda',
  'rausve',
  'resketa',
  'riese',
  'ringuva',
  'rominta',
  'roveja',
  'rudamina',
  'saide',
  'salantas',
  'salcia',
  'salpe',
  'saltuona',
  'sanziles_kanalas',
  'saria',
  'sasuola',
  'sata',
  'sausdravas',
  'seimena',
  'seira',
  'selmenta',
  'serksne',
  'sesupe',
  'sesuva',
  'sesuvis',
  'siause',
  'siesartis_sesupe',
  'siesartis_sventoji',
  'simsa',
  'sirvinta_sesupe',
  'sirvinta_sventoji',
  'skroblus',
  'smelte',
  'smilga',
  'spengla_dubinga',
  'spengla_merkys',
  'srove',
  'sruoja',
  'stirne',
  'strauja',
  'streva',
  'sunija',
  'suoja',
  'sustis',
  'susve',
  'sventoji',
  'sventoji_pajurio',
  'svete',
  'svogina',
  'svyla',
  'sysa',
  'tatula',
  'tenenys',
  'tramis',
  'ula',
  'upe',
  'upita',
  'upyte',
  'vadakstis',
  'varduva',
  'varene',
  'veivirzas',
  'venta',
  'verkne',
  'verseka',
  'vidauja',
  'viesete',
  'viesinta',
  'viesvile',
  'vilka',
  'vilnele',
  'virinta',
  'virvycia',
  'visakis',
  'visincia',
  'vizaina',
  'voke',
  'vyzuona_nemunelis',
  'vyzuona_sventoji',
  'yzne',
  'zanyla',
  'zapse',
  'zeimena',
  'zembre',
  'zizma',
  'zvelsa',
] as const;

export const amenityVariants = [
  'transport',
  'child-seat',
  'life-vest',
  'phone-case',
  'dry-bag',
  'tent',
  'sleeping-bag',
  'grill',
  'guide',
  'camera',
  'pet-friendly',
] as const;

export const boats = [
  'single-kayak',
  'double-kayak',
  'triple-kayak',
  'raft',
] as const;

export const units = ['tour', 'day', 'h', 'km'] as const;

export const difficulty = [1, 2, 3, 4, 5] as const;

export type Region = typeof regions[number];

export type River = typeof rivers[number];

export type AmenityVariant = typeof amenityVariants[number];

export type Boat = typeof boats[number];

export type Unit = typeof units[number];

export type Difficulty = typeof difficulty[number];

export interface Amenity {
  variant: AmenityVariant;
  price: number;
  currency: Currency;
  unit: Unit;
  info: string;
}

export interface Tour {
  _id: string;
  name: string;
  slug: string;
  description: string;
  departure: string;
  arrival: string;
  distance: number | null;
  duration: number | null;
  days: number;
  rivers: River[];
  regions: Region[];
  difficulty: number;
  price: Price | null;
  photos: AppFile[];
  company: Company;
  website: string;
  amenities: Amenity[];
  boats: Boat[];
  languages: Language[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ToursFilters {
  user?: string;
  select?: (keyof Tour)[];
}
