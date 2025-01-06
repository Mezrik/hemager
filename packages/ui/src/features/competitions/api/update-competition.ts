import { CompetitionTypeEnum, GenderEnum } from '@/generated/server';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getCompetitionsQueryOptions } from './get-competitions';
import { t } from '@lingui/macro';
import { getCompetitionQueryOptions } from './get-competition';

export const updateCompetitionInputSchema = z.object({
  categoryId: z.string().uuid(t`Select correct category`),
  competitionType: z.nativeEnum(CompetitionTypeEnum),
  date: z.date({ message: t`Date of the competition is required` }),
  federationName: z.string().min(1, t`Federation name is required`),
  gender: z.nativeEnum(GenderEnum),
  name: z.string().min(1, t`Competition name is required`),
  organizerName: z.string().min(1, t`Organizer name is required`),
  weaponId: z.string().uuid(t`Select correct weapon`),
});

export type UpdateCompetitionInput = z.infer<typeof updateCompetitionInputSchema>;

export const updateCompetition = ({ data, id }: { data: UpdateCompetitionInput; id: UUID }) => {
  const date = data.date.toISOString();
  return api.UpdateCompetition(id, { ...data, date });
};

type UseUpdateCompetitionOptions = {
  mutationConfig?: MutationConfig<typeof updateCompetition>;
};

export const useUpdateCompetition = ({ mutationConfig }: UseUpdateCompetitionOptions = {}) => {
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
    mutationFn: updateCompetition,
  });
};
