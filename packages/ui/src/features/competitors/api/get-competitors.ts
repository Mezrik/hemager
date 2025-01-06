import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCompetitorsQueryOptions = () => {
  return queryOptions({
    queryKey: ['competitors'],
    queryFn: async () => {
      const temp = await api.GetCompetitors();
      console.log(temp);
      return temp;
    },
  });
};

type UseCompetitorsOptions = {
  queryConfig?: QueryConfig<typeof api.GetCompetitors>;
};

export const useCompetitors = ({ queryConfig }: UseCompetitorsOptions = {}) => {
  return useQuery({
    ...getCompetitorsQueryOptions(),
    ...queryConfig,
  });
};
