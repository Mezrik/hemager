import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';

export const getContestResultsQueryOptions = (contestId: UUID) => {
  return queryOptions({
    queryKey: ['get-results-all', contestId],
    queryFn: async () => {
      const temp = await api.GetContestResults(contestId);
      console.log(temp, contestId, 'results');
      return temp;
    },
  });
};

type UseContestResultsOptions = {
  contestId: UUID;
  queryConfig?: QueryConfig<typeof getContestResultsQueryOptions>;
};

export const useContestResults = ({ contestId, queryConfig }: UseContestResultsOptions) => {
  return useQuery({
    ...getContestResultsQueryOptions(contestId),
    ...queryConfig,
  });
};
