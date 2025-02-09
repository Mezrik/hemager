import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';

import { getParticipantsQueryOptions } from '../../competitions/api/get-participants';

export const assignParticipantsInputSchema = z.object({
  contestId: z.string().nanoid(t`Select correct competition`),
  competitorIds: z.array(z.string()),
});

export type AssignParticipantInput = z.infer<typeof assignParticipantsInputSchema>;

export const assignParticipants = async ({ data }: { data: AssignParticipantInput }) => {
  console.log(data);
  const t = await api.AssignParticipants(data.competitorIds, data.contestId);
  console.log(t);
  return t;
};

type UseAssignParticipantOptions = {
  mutationConfig?: MutationConfig<typeof assignParticipants>;
};

export const useAssignParticipants = ({ mutationConfig }: UseAssignParticipantOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      const [, { data }] = args;
      void queryClient.invalidateQueries({
        queryKey: getParticipantsQueryOptions(data.contestId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: assignParticipants,
  });
};
