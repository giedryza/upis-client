import { ApiError } from './api.error';

export class Errors {
  #defaultMessage = 'Something went wrong.';

  constructor(private error: unknown) {}

  #showError = (message: string) => {
    console.error(message);
  };

  handleAll = () => {
    this.#showError(this.#defaultMessage);
  };

  handleGeneric = () => {
    if (this.error instanceof Error) {
      this.#showError(this.error.message);
    }

    this.handleAll();
  };

  handleApi = () => {
    if (this.error instanceof ApiError) {
      this.#showError(this.error.message);

      return;
    }

    this.handleGeneric();
  };

  handleForm = <T>(
    setError: (
      name: keyof T,
      error: { message: string; shouldFocus: boolean }
    ) => void
  ) => {
    if (this.error instanceof ApiError) {
      this.error.data.forEach(({ field, message }) => {
        if (field) {
          setError(field as keyof T, {
            message,
            shouldFocus: true,
          });

          return;
        }

        this.#showError(message);
      });

      return;
    }

    this.handleGeneric();
  };
}
