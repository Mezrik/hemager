import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { api } from '@/services/api';

export const getCompetitionCategoriesQueryOptions = () => {
  return queryOptions({
    queryKey: ['get-competition-categories'],
    queryFn: () => api.GetCompetitionsCategories(),
  });
};

type UseCompetitionCategoriesOptions = {
  queryConfig?: QueryConfig<typeof getCompetitionCategoriesQueryOptions>;
};

export const useCompetitionCategories = ({ queryConfig }: UseCompetitionCategoriesOptions = {}) => {
  return useQuery({
    ...getCompetitionCategoriesQueryOptions(),
    ...queryConfig,
  });
};
