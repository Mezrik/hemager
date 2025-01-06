import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCompetitorQueryOptions = (id: UUID) => {
  return queryOptions({
    queryKey: ['competitor', id],
    queryFn: async () => await api.GetCompetitor(id),
  });
};

type UseCompetitorOptions = {
  competitorId: UUID;
  queryConfig?: QueryConfig<typeof api.GetCompetitors>;
};

export const useCompetitor = ({ queryConfig, competitorId }: UseCompetitorOptions) => {
  return useQuery({
    ...getCompetitorQueryOptions(competitorId),
    ...queryConfig,
  });
};
