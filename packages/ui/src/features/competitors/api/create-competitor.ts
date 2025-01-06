import { GenderEnum } from '@/generated/server';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { t } from '@lingui/macro';
import { getCompetitorsQueryOptions } from './get-competitors';

export const createCompetitorInputSchema = z.object({
  firstname: z.string().min(1, t`Firstname is required`),
  surname: z.string().min(1, t`Surname is required`),
  gender: z.nativeEnum(GenderEnum),
  license: z.string().min(1, t`License is required`),
  licenseFie: z.string(),
  birthdate: z.date({ message: t`Date of birth is required` }),
  clubId: z.string().uuid().optional(),
});

export type createCompetitorInput = z.infer<typeof createCompetitorInputSchema>;

export const createCompetitor = ({ data }: { data: createCompetitorInput }) => {
  const birthdate = data.birthdate.toISOString();
  return api.CreateCompetitor({ ...data, birthdate });
};

type UseCreateCompetitorOptions = {
  mutationConfig?: MutationConfig<typeof createCompetitor>;
};

export const useCreateCompetitor = ({ mutationConfig }: UseCreateCompetitorOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getCompetitorsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: createCompetitor,
  });
};
