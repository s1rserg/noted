import type { ValueOf } from 'types/utils';

export const ViewMode = {
  LIST: 'list',
  GRID: 'grid',
} as const;

export type ViewModeValues = ValueOf<typeof ViewMode>;
