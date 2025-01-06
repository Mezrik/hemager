import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCompetitionsQueryOptions = () => {
  return queryOptions({
    queryKey: ['competitions'],
    queryFn: async () => {
      const comps = await api.GetCompetitions();
      console.log(comps);
      return comps;
    },
  });
};

type UseCompetitionsOptions = {
  queryConfig?: QueryConfig<typeof getCompetitionsQueryOptions>;
};

export const useCompetitions = ({ queryConfig }: UseCompetitionsOptions) => {
  return useQuery({
    ...getCompetitionsQueryOptions(),
    ...queryConfig,
  });
};
