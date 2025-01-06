import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getParticipantsQueryOptions = (competitionId: UUID) => {
  return queryOptions({
    queryKey: ['participants-for-competition', competitionId],
    queryFn: async () => {
      return await api.GetParticipants(competitionId);
    },
  });
};

type UseParticipantsOptions = {
  competitionId: UUID;
  queryConfig?: QueryConfig<typeof getParticipantsQueryOptions>;
};

export const useParticipants = ({ competitionId, queryConfig }: UseParticipantsOptions) => {
  return useQuery({
    ...getParticipantsQueryOptions(competitionId),
    ...queryConfig,
  });
};
