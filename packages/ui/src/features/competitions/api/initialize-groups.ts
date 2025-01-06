import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { t } from '@lingui/macro';
import { getCompetitionsGroupsQueryOptions } from './get-groups';
import { getParticipantsQueryOptions } from '@/features/competitors/api/get-participants';

export const initializeGroupsInputSchema = z.object({
  competitionId: z.string().uuid(t``),
});

export type InitializeGroupsInput = z.infer<typeof initializeGroupsInputSchema>;

export const initializeGroups = ({ data }: { data: InitializeGroupsInput }) => {
  return api.InitializeGroups(data.competitionId);
};

type UseInitializeGroupsOptions = {
  mutationConfig?: MutationConfig<typeof initializeGroups>;
};

export const useInitializeGroups = ({ mutationConfig }: UseInitializeGroupsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCompetitionsGroupsQueryOptions(args[1].data.competitionId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getParticipantsQueryOptions(args[1].data.competitionId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: initializeGroups,
  });
};
