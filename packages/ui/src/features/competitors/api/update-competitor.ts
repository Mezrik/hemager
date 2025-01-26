import { Country, GenderEnum } from '@hemager/api-types';
import { t } from '@lingui/macro';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';

import { getCompetitorsQueryOptions } from './get-competitors';

export const updateCompetitorInputSchema = z.object({
  firstname: z.string().min(1, t`Firstname is required`),
  surname: z.string().min(1, t`Surname is required`),
  gender: z.nativeEnum(GenderEnum).optional(),
  birthdate: z.date().optional(),
  clubId: z.string().nanoid().optional(),
  rating: z.coerce.number().optional(),
  nationality: z.nativeEnum(Country).optional(),
});

export type updateCompetitorInput = z.infer<typeof updateCompetitorInputSchema>;

export const updateCompetitor = ({ data, id }: { data: updateCompetitorInput; id: UUID }) => {
  return api.UpdateCompetitor(id, { ...data });
};

type UseUpdateCompetitorOptions = {
  mutationConfig?: MutationConfig<typeof updateCompetitor>;
  noRefetch?: boolean;
};

export const useUpdateCompetitor = ({
  mutationConfig,
  noRefetch,
}: UseUpdateCompetitorOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...rest } = mutationConfig || {};

  return useMutation({
    onSuccess: async (...args) => {
      !noRefetch &&
        (await queryClient.invalidateQueries({
          queryKey: getCompetitorsQueryOptions().queryKey,
        }));
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: updateCompetitor,
  });
};
