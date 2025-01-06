import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCompetitionGroupQueryOptions = (competitionId: UUID, groupId: UUID) => {
  return queryOptions({
    queryKey: ['get-competition-group', competitionId, groupId],
    queryFn: async () => {
      return await api.GetGroup(groupId, competitionId);
    },
  });
};

type UseCompetitionGroupOption = {
  competitionId: UUID;
  groupId: UUID;
  queryConfig?: QueryConfig<typeof getCompetitionGroupQueryOptions>;
};

export const useCompetitionGroup = ({
  competitionId,
  groupId,
  queryConfig,
}: UseCompetitionGroupOption) => {
  return useQuery({
    ...getCompetitionGroupQueryOptions(competitionId, groupId),
    ...queryConfig,
  });
};
