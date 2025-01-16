import { ContestTypeEnum, GenderEnum } from '@hemager/api-types';
import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';

import { getCompetitionsQueryOptions } from './get-competitions';

export const createCompetitionInputSchema = z.object({
  categoryId: z.string().uuid(t`Select correct category`),
  contestType: z.nativeEnum(ContestTypeEnum),
  date: z.date({ message: t`Date of the competition is required` }),
  federationName: z.string().min(1, t`Federation name is required`),
  gender: z.nativeEnum(GenderEnum),
  name: z.string().min(1, t`Competition name is required`),
  organizerName: z.string().min(1, t`Organizer name is required`),
  weaponId: z.string().uuid(t`Select correct weapon`),
});

export type CreateCompetitionInput = z.infer<typeof createCompetitionInputSchema>;

export const createCompetition = ({ data }: { data: CreateCompetitionInput }) => {
  return api.CreateCompetition(data);
};

type UseCreateCompetitionOptions = {
  mutationConfig?: MutationConfig<typeof createCompetition>;
};

export const useCreateCompetition = ({ mutationConfig }: UseCreateCompetitionOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getCompetitionsQueryOptions().queryKey,
      });

      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: createCompetition,
  });
};
