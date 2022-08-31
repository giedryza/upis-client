export type Converter<
  GetLoaders extends () => { loaders: Record<string, (...args: any) => any> },
  Loader extends keyof ReturnType<GetLoaders>['loaders']
> = Awaited<ReturnType<ReturnType<GetLoaders>['loaders'][Loader]>>;
