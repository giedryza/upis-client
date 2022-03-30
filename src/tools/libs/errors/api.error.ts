interface Data {
  message: string;
  field?: string;
}

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number,
    public data: Data[],
    public isAppError: boolean
  ) {
    super(message);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
