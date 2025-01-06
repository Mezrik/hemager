import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { z } from 'zod';
import { getParticipantsQueryOptions } from './get-participants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { t } from '@lingui/macro';

export const assignParticipantsInputSchema = z.object({
  competitionId: z.string().uuid(t`Select correct competition`),
  competitorIds: z.array(z.string().uuid(t`Select correct competitor`)),
});

export type AssignParticipantInput = z.infer<typeof assignParticipantsInputSchema>;

export const assignParticipants = ({ data }: { data: AssignParticipantInput }) => {
  return api.AssignParticipants(data.competitorIds, data.competitionId);
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
      queryClient.invalidateQueries({
        queryKey: getParticipantsQueryOptions(data.competitionId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: assignParticipants,
  });
};
