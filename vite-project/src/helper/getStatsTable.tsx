// tableStats.helper.ts

export type TableStatsResult<T> = {
  data: T[];
  total: number;
  visible: number;
  isFiltering: boolean;
};
export function getTableStats<T>(
  originalData: T[] = [],
  filteredData?: T[] | null,
): TableStatsResult<T> {
  const safeOriginal = Array.isArray(originalData) ? originalData : [];
  const isFiltering = filteredData !== null && filteredData !== undefined;

  const safeFiltered = Array.isArray(filteredData) ? filteredData : [];

  const data = isFiltering ? safeFiltered : safeOriginal;

  return {
    data,
    total: safeOriginal.length,
    visible: data.length,
    isFiltering,
  };
}
