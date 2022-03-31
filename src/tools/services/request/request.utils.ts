type JsonData = Record<string, any>;

type FilesData = { field: string; file: File }[];

export const getJsonBody = (data: JsonData): string => JSON.stringify(data);

export const getFilesBody = (data: FilesData): FormData => {
  const formData = new FormData();

  data.forEach(({ field, file }) => formData.append(field, file));

  return formData;
};
