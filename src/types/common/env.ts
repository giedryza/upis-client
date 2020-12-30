export type NodeEnv = 'production' | 'development' | 'test';

export interface Env {
  NODE_ENV: NodeEnv;
  NEXT_PUBLIC_HOST_CLIENT: string;
  NEXT_PUBLIC_HOST_API: string;
}
