import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { getParticipantsQueryOptions } from '@/features/competitions/api/get-participants';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';

import { getCompetitionsGroupsQueryOptions } from './get-groups';

export const initializeGroupsInputSchema = z.object({
  contestId: z.string().nanoid(t``),
  maxParticipantsPerGroup: z.coerce
    .number()
    .min(4, t`The minimum number of participants per group is 4`),
});

export type InitializeGroupsInput = z.infer<typeof initializeGroupsInputSchema>;

export const initializeGroups = ({ data }: { data: InitializeGroupsInput }) => {
  return api.InitializeGroups(data);
};

type UseInitializeGroupsOptions = {
  mutationConfig?: MutationConfig<typeof initializeGroups>;
};

export const useInitializeGroups = ({ mutationConfig }: UseInitializeGroupsOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getCompetitionsGroupsQueryOptions(args[1].data.contestId).queryKey,
      });
      await queryClient.invalidateQueries({
        queryKey: getParticipantsQueryOptions(args[1].data.contestId).queryKey,
      });

      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: initializeGroups,
  });
};
