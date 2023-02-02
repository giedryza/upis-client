const serpViews = ['list', 'map'] as const;

export type SerpView = (typeof serpViews)[number];
