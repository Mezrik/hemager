import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getMatchesQueryOptions = (groupId: UUID) => {
  return queryOptions({
    queryKey: ['get-matches', groupId],
    queryFn: async () => {
      return await api.GetMatches(groupId);
    },
  });
};

type UseMatchesOptions = {
  groupId: UUID;
  queryConfig?: QueryConfig<typeof getMatchesQueryOptions>;
};

export const useMatches = ({ groupId, queryConfig }: UseMatchesOptions) => {
  return useQuery({
    ...getMatchesQueryOptions(groupId),
    ...queryConfig,
  });
};
