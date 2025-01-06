import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { QueryConfig } from '@/lib/react-query';

export const getCompetitionsGroupsQueryOptions = (competitionId: UUID) => {
  return queryOptions({
    queryKey: ['get-competition-groups', competitionId],
    queryFn: async () => {
      return await api.GetCompetitionsGroups(competitionId);
    },
  });
};

type UseCompetitionsGroupsOptions = {
  competitionId: UUID;
  queryConfig?: QueryConfig<typeof getCompetitionsGroupsQueryOptions>;
};

export const useCompetitionsGroups = ({
  competitionId,
  queryConfig,
}: UseCompetitionsGroupsOptions) => {
  return useQuery({
    ...getCompetitionsGroupsQueryOptions(competitionId),
    ...queryConfig,
  });
};
