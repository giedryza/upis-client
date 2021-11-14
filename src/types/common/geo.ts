export interface Point {
  lat: number;
  lng: number;
}

export type PointTuple = [number, number];

export type BoundsTuple = [PointTuple, PointTuple];
