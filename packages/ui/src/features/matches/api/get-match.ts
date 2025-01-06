import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getMatchQueryOptions = (matchId: UUID) => {
  return queryOptions({
    queryKey: ['get-match', matchId],
    queryFn: async () => {
      return await api.GetMatch(matchId);
    },
  });
};

type UseMatchOptions = {
  matchId: UUID;
  queryConfig?: QueryConfig<typeof getMatchQueryOptions>;
};

export const useMatch = ({ matchId, queryConfig }: UseMatchOptions) => {
  return useQuery({
    ...getMatchQueryOptions(matchId),
    ...queryConfig,
  });
};
