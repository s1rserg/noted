import { type TaskQueryParameters } from 'api';
import { FilterSortDefaults, QueryKeys } from '../types';

export const getQueryParameters = (searchParams: URLSearchParams): TaskQueryParameters => {
  const get = (key: string) => searchParams.get(key) || undefined;

  const q = get(QueryKeys.SEARCH);
  const currentSortBy = get(QueryKeys.SORT_BY);
  const currentSortOrder = get(QueryKeys.SORT_ORDER);

  let finalSortBy: string | undefined;
  let finalSortOrder: string | undefined;

  if (currentSortBy || currentSortOrder) {
    finalSortBy = currentSortBy || FilterSortDefaults.SORT_BY;
    finalSortOrder = currentSortOrder || FilterSortDefaults.SORT_ORDER;
  }

  return {
    q: q,
    searchBy: q ? 'title' : undefined,
    status: get(QueryKeys.STATUS),
    priority: get(QueryKeys.PRIORITY),
    sortBy: finalSortBy,
    order: finalSortOrder?.toUpperCase(),
  };
};
