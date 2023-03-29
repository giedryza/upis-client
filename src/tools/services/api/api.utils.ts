import { useRouter } from 'next/router';

type JsonData = Record<string, any>;

const stripFalsyValues = <InitialObject extends JsonData>(
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

export const getFormDataBody = (
  data: { field: string; value: File | string }[]
): FormData => {
  const formData = new FormData();

  data.forEach(({ field, value: file }) => formData.append(field, file));

  return formData;
};

export const loadersFactory = <T extends {}>(
  getLoaders: (locale?: string) => { loaders: T }
) => {
  const useLoaders = () => {
    const { locale } = useRouter();

    const { loaders } = getLoaders(locale);

    return {
      loaders,
    };
  };

  return {
    getLoaders,
    useLoaders,
  };
};
