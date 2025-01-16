import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';

export const getWeaponsQueryOptions = () => {
  return queryOptions({
    queryKey: ['get-weapons'],
    queryFn: () => api.GetCompetitionsWeapons(),
  });
};

type UseWeaponsOptions = {
  queryConfig?: QueryConfig<typeof getWeaponsQueryOptions>;
};

export const useWeapons = ({ queryConfig }: UseWeaponsOptions = {}) => {
  return useQuery({
    ...getWeaponsQueryOptions(),
    ...queryConfig,
  });
};
