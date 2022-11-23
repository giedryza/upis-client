export interface Props {
  label: string;
  value: string | number | null | undefined;
  fallback?: string | null;
  formatOptions?: Intl.NumberFormatOptions;
}
