import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { MatchUpdateInput } from '@hemager/api-types';
import { getMatchQueryOptions } from './get-match';
import { getMatchesQueryOptions } from './get-matches';

export const updateMatch = ({ data }: { data: MatchUpdateInput }) => {
  return api.MatchUpdate(data);
};

type UseUpdateMatchOptions = {
  mutationConfig?: MutationConfig<typeof updateMatch>;
};

export const useUpdateMatch = ({ mutationConfig }: UseUpdateMatchOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getMatchQueryOptions(args[1].data.matchId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: updateMatch,
  });
};
