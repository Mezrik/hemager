import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';

export const getParticipantsQueryOptions = (competitionId: UUID) => {
  return queryOptions({
    queryKey: ['participants-for-competition', competitionId],
    queryFn: async () => {
      const temp = await api.GetParticipants(competitionId);
      console.log(temp, competitionId);
      return temp;
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
