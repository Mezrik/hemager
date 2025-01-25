import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';

export const getClubQueryOptions = (id: UUID) => {
  return queryOptions({
    queryKey: ['get-club', id],
    queryFn: async () => await api.GetClub(id),
  });
};

type UseClubOptions = {
  clubId: UUID;
  queryConfig?: QueryConfig<typeof api.GetClub>;
};

export const useClub = ({ queryConfig, clubId }: UseClubOptions) => {
  return useQuery({
    ...getClubQueryOptions(clubId),
    ...queryConfig,
  });
};
