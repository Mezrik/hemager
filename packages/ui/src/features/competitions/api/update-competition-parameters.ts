import { DeploymentCriteria } from '@hemager/api-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';

import { getCompetitionQueryOptions } from './get-competition';
import { getCompetitionsQueryOptions } from './get-competitions';

export const updateCompetitionParametersInputSchema = z.object({
  deploymentCriteria: z.array(z.nativeEnum(DeploymentCriteria)),
  eliminationHits: z.coerce
    .number({
      required_error: 'Elimination hits field is required',
      invalid_type_error: 'Elimination hits field must be a number',
    })
    .int()
    .positive()
    .min(1, { message: 'Elimination hits field should be at least 1' })
    .optional(),
  expectedParticipants: z.coerce
    .number({
      required_error: 'Expected participants field is required',
      invalid_type_error: 'Expected participants field must be a number',
    })
    .int()
    .positive()
    .min(1, { message: 'Expected participants field should be at least 1' })
    .optional(),
  groupHits: z.coerce
    .number({
      required_error: 'Group hits field is required',
      invalid_type_error: 'Group hits field must be a number',
    })
    .int()
    .positive()
    .min(1, { message: 'Group hits field should be at least 1' })
    .optional(),
});

export type UpdateCompetitionParametersInput = z.infer<
  typeof updateCompetitionParametersInputSchema
>;

export const updateCompetitionParameters = ({
  data,
  id,
}: {
  data: UpdateCompetitionParametersInput;
  id: UUID;
}) => {
  console.log('in mutation', data, id);
  return api.UpdateCompetition({ id, ...data });
};

type UseUpdateCompetitionParametersOptions = {
  mutationConfig?: MutationConfig<typeof updateCompetitionParameters>;
};

export const useUpdateCompetitionParameters = ({
  mutationConfig,
}: UseUpdateCompetitionParametersOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCompetitionsQueryOptions().queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getCompetitionQueryOptions(args[1].id).queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: updateCompetitionParameters,
  });
};
