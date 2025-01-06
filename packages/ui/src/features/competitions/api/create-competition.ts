import { CompetitionTypeEnum, GenderEnum } from '@/generated/server';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getCompetitionsQueryOptions } from './get-competitions';
import { t } from '@lingui/macro';

export const createCompetitionInputSchema = z.object({
  categoryId: z.string().uuid(t`Select correct category`),
  competitionType: z.nativeEnum(CompetitionTypeEnum),
  date: z.date({ message: t`Date of the competition is required` }),
  federationName: z.string().min(1, t`Federation name is required`),
  gender: z.nativeEnum(GenderEnum),
  name: z.string().min(1, t`Competition name is required`),
  organizerName: z.string().min(1, t`Organizer name is required`),
  weaponId: z.string().uuid(t`Select correct weapon`),
});

export type CreateCompetitionInput = z.infer<typeof createCompetitionInputSchema>;

export const createCompetition = ({ data }: { data: CreateCompetitionInput }) => {
  const date = data.date.toISOString();
  return api.CreateCompetition({ ...data, date });
};

type UseCreateCompetitionOptions = {
  mutationConfig?: MutationConfig<typeof createCompetition>;
};

export const useCreateCompetition = ({ mutationConfig }: UseCreateCompetitionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCompetitionsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: createCompetition,
  });
};
