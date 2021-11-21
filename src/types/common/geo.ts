export interface Point {
  lat: number;
  lng: number;
}

export type PointTuple = [number, number];

export type BoundsTuple = [PointTuple, PointTuple];

export interface OSMLocation {
  place_id?: number;
  licence?: string;
  osm_type?: string;
  osm_id?: number;
  lat?: string;
  lon?: string;
  place_rank?: number;
  category?: string;
  type?: string;
  importance?: number;
  addresstype?: string;
  display_name?: string;
  name?: string | null;
  address?: {
    road?: string;
    village?: string;
    state_district?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox?: [string, string, string, string];
  error?: string;
}

export interface OSMError {
  error: string;
}
