export interface Props {
  value: string | number | null | undefined;
  fallback?: string | null;
  formatOptions?: Intl.NumberFormatOptions;
}
