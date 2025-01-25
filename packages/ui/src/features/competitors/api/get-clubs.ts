import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';

export const getClubsQueryOptions = () => {
  return queryOptions({
    queryKey: ['get-all-clubs'],
    queryFn: async () => {
      const temp = await api.GetClubs();
      console.log(temp);
      return temp;
    },
  });
};

type UseClubsOptions = {
  queryConfig?: QueryConfig<typeof api.GetClubs>;
};

export const useClubs = ({ queryConfig }: UseClubsOptions = {}) => {
  return useQuery({
    ...getClubsQueryOptions(),
    ...queryConfig,
  });
};
