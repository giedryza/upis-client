import { AnyFunction } from 'types/common';

export type Converter<
  GetLoaders extends () => { loaders: Record<string, AnyFunction> },
  Loader extends keyof ReturnType<GetLoaders>['loaders']
> = Awaited<ReturnType<ReturnType<GetLoaders>['loaders'][Loader]>>;
