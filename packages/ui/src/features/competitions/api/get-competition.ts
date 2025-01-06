import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getCompetitionQueryOptions = (competitionId: UUID) => {
  return queryOptions({
    queryKey: ['get-competition', competitionId],
    queryFn: async () => {
      const temp = await api.GetCompetition(competitionId);
      console.log(temp, competitionId);
      return temp;
    },
  });
};

type UseCompetitionOptions = {
  competitionId: UUID;
  queryConfig?: QueryConfig<typeof getCompetitionQueryOptions>;
};

export const useCompetition = ({ competitionId, queryConfig }: UseCompetitionOptions) => {
  return useQuery({
    ...getCompetitionQueryOptions(competitionId),
    ...queryConfig,
  });
};
