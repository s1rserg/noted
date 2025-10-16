import type { TaskPriorityValues, TaskStatusValues } from 'types/task';
import type { ValueOf } from 'types/utils';

export const ViewMode = {
  LIST: 'list',
  GRID: 'grid',
} as const;

export type ViewModeValues = ValueOf<typeof ViewMode>;

export const QueryKeys = {
  SEARCH: 'search',
  SORT_BY: 'sortBy',
  SORT_ORDER: 'sortOrder',
  STATUS: 'status',
  PRIORITY: 'priority',
} as const;

export const SortOrder = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export const SortBy = {
  CREATED_AT: 'createdAt',
  TITLE: 'title',
  STATUS: 'status',
  PRIORITY: 'priority',
} as const;

export type SortOrderValues = ValueOf<typeof SortOrder>;
export type SortByValues = ValueOf<typeof SortBy>;

export const FilterSortDefaults = {
  SORT_BY: SortBy.CREATED_AT,
  SORT_ORDER: SortOrder.DESC,
  FILTER_ALL: 'all',
} as const;

export type StatusFilterValues = TaskStatusValues | 'all';
export type PriorityFilterValues = TaskPriorityValues | 'all';
