import { z } from 'zod';

import { Amenity, amenities, Variant } from 'domain/amenities';
import { Provider } from 'domain/providers';
import { AppFile, BaseEntity, GeoPoint, Pagination, Price } from 'types/common';

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

export const difficulty = [1, 2, 3, 4, 5] as const;

export type Region = (typeof regions)[number];

export type River = (typeof rivers)[number];

export type Difficulty = (typeof difficulty)[number];

export interface Tour extends BaseEntity {
  name: string;
  slug: string;
  description: string;
  departure: GeoPoint;
  arrival: GeoPoint;
  distance: number | null;
  duration: number | null;
  days: number;
  rivers: River[];
  regions: Region[];
  difficulty: number;
  price: Price | null;
  photos: AppFile[];
  primaryPhoto: string;
  provider: Provider;
  website: string;
  amenities: { _id: Amenity; variant: Variant }[];
  score: number;
  createdAt: Date;
  updatedAt: Date;
}

const queryUtils = {
  select: [
    '_id',
    'name',
    'distance',
    'days',
    'duration',
    'price',
    'departure',
    'arrival',
  ],
  populate: ['provider', 'provider.amenities', 'amenities', 'photos'],
} as const;

export const tourFilters = z.object({
  amenities: z.array(z.enum(amenities)).catch([]),
  regions: z.array(z.enum(regions)).catch([]),
  rivers: z.array(z.enum(rivers)).catch([]),
  distanceFrom: z.coerce.number().finite().min(1).catch(1),
  distanceTo: z.coerce.number().finite().min(1).catch(1),
  durationFrom: z.coerce.number().finite().min(1).catch(1),
  durationTo: z.coerce.number().finite().min(1).catch(1),
  daysFrom: z.coerce.number().finite().int().min(1).catch(1),
  daysTo: z.coerce.number().finite().int().min(1).catch(1),
  difficultyFrom: z.coerce.number().finite().min(0).max(5).catch(0),
  difficultyTo: z.coerce.number().finite().min(0).max(5).catch(5),
  user: z.coerce.string(),
  bounds: z
    .tuple([
      z.coerce.number().finite(),
      z.coerce.number().finite(),
      z.coerce.number().finite(),
      z.coerce.number().finite(),
    ])
    .catch([NaN, NaN, NaN, NaN]),
});

interface TourUtilFilters {
  departure: boolean;
  select: Array<(typeof queryUtils.select)[number]>;
  populate: Array<(typeof queryUtils.populate)[number]>;
}

export type TourFilters = z.infer<typeof tourFilters> &
  TourUtilFilters &
  Pagination;

export interface FiltersSummary {
  distance: { min: number; max: number };
  days: { min: number; max: number };
  duration: { min: number; max: number };
  difficulty: { min: number; max: number };
}
