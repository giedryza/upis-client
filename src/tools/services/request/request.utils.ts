import useTranslation from 'next-translate/useTranslation';

type JsonData = Record<string, any>;

type FilesData = { field: string; file: File }[];

export const stripFalsyValues = <InitialObject extends JsonData>(
  object: InitialObject,
  falsyValues: (string | number | boolean | null | undefined)[] = [
    NaN,
    null,
    undefined,
  ]
): Partial<InitialObject> =>
  Object.fromEntries(
    Object.entries(object).filter(([_, value]) => !falsyValues.includes(value))
  ) as Partial<InitialObject>;

export const getJsonBody = (
  data: JsonData,
  falsyValues?: (string | number | boolean | null | undefined)[]
): string => {
  const body = falsyValues ? stripFalsyValues(data, falsyValues) : data;

  return JSON.stringify(body);
};

export const getFilesBody = (data: FilesData): FormData => {
  const formData = new FormData();

  data.forEach(({ field, file }) => formData.append(field, file));

  return formData;
};

export const loadersFactory = <T extends {}>(
  getLoaders: (locale?: string) => { loaders: T }
) => {
  const useLoaders = () => {
    const { lang } = useTranslation();

    const { loaders } = getLoaders(lang);

    return {
      loaders,
    };
  };

  return {
    getLoaders,
    useLoaders,
  };
};
