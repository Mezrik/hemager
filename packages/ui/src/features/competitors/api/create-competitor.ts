import { Country, GenderEnum } from '@hemager/api-types';
import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';

import { getCompetitorsQueryOptions } from './get-competitors';

export const createCompetitorInputSchema = z.object({
  firstname: z.string().min(1, t`Firstname is required`),
  surname: z.string().min(1, t`Surname is required`),
  gender: z.nativeEnum(GenderEnum).optional(),
  birthdate: z.date().optional(),
  clubId: z.string().nanoid().optional(),
  rating: z.coerce.number().optional(),
  nationality: z.nativeEnum(Country).optional(),
});

export type createCompetitorInput = z.infer<typeof createCompetitorInputSchema>;

export const createCompetitor = ({ data }: { data: createCompetitorInput }) => {
  return api.CreateCompetitor(data);
};

type UseCreateCompetitorOptions = {
  mutationConfig?: MutationConfig<typeof createCompetitor>;
};

export const useCreateCompetitor = ({ mutationConfig }: UseCreateCompetitorOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      await queryClient.invalidateQueries({
        queryKey: getCompetitorsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: createCompetitor,
  });
};
