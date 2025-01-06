import { DeploymentTypeEnum } from '@/generated/server';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getCompetitionsQueryOptions } from './get-competitions';
import { t } from '@lingui/macro';
import { getCompetitionQueryOptions } from './get-competition';

export const updateCompetitionParametersInputSchema = z.object({
  deploymentType: z.nativeEnum(DeploymentTypeEnum),
  eliminationHits: z.coerce
    .number({
      required_error: 'Elimination hits field is required',
      invalid_type_error: 'Elimination hits field must be a number',
    })
    .int()
    .positive()
    .min(1, { message: 'Elimination hits field should be at least 1' }),
  expectedParticipants: z.coerce
    .number({
      required_error: 'Expected participants field is required',
      invalid_type_error: 'Expected participants field must be a number',
    })
    .int()
    .positive()
    .min(1, { message: 'Expected participants field should be at least 1' }),
  groupHits: z.coerce
    .number({
      required_error: 'Group hits field is required',
      invalid_type_error: 'Group hits field must be a number',
    })
    .int()
    .positive()
    .min(1, { message: 'Group hits field should be at least 1' }),
  qualificationBasedOnRounds: z.coerce
    .number({
      required_error: 'Qualification based on rounds field is required',
      invalid_type_error: 'Qualification based on rounds field must be a number',
    })
    .int()
    .min(1, { message: 'Qualification based on rounds field should be at least 1' }),
  roundsCount: z.coerce
    .number({
      required_error: 'Rounds count field is required',
      invalid_type_error: 'Rounds count field must be a number',
    })
    .int()
    .min(1, { message: 'Rounds count field should be at least 1' }),
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
  return api.UpdateCompetitionParameters(id, { ...data });
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
