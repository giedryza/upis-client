import { isDefined } from 'tools/common';

class Cookies {
  private getExpiryDate = (days: number) => {
    const date = new Date();

    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);

    return date.toUTCString();
  };

  set = (name: string, value: string, days?: number) => {
    const item = `${name}=${value || ''}`;
    const expires = days ? `expires=${this.getExpiryDate(days)}` : null;
    const domain = 'path=/';

    const cookie = [item, expires, domain].filter(isDefined).join('; ');

    document.cookie = cookie;
  };

  get = (name: string) => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]!;
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  delete = (name: string) => {
    const item = `${name}=`;
    const expires = `expires=${new Date(1000).toUTCString()}`;
    const domain = 'path=/';

    const cookie = [item, expires, domain].join('; ');

    document.cookie = cookie;
  };
}

export const cookies = new Cookies();
