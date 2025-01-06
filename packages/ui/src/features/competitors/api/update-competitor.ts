import { GenderEnum } from '@/generated/server';
import { MutationConfig } from '@/lib/react-query';
import { api } from '@/services/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { t } from '@lingui/macro';
import { getCompetitorsQueryOptions } from './get-competitors';

export const updateCompetitorInputSchema = z.object({
  firstname: z.string().min(1, t`Firstname is required`),
  surname: z.string().min(1, t`Surname is required`),
  gender: z.nativeEnum(GenderEnum),
  license: z.string().min(1, t`License is required`),
  licenseFie: z.string(),
  birthdate: z.date({ message: t`Date of birth is required` }),
  clubId: z.string().uuid().optional(),
});

export type updateCompetitorInput = z.infer<typeof updateCompetitorInputSchema>;

export const updateCompetitor = ({ data, id }: { data: updateCompetitorInput; id: UUID }) => {
  const birthdate = data.birthdate.toISOString();
  return api.UpdateCompetitor(id, { ...data, birthdate });
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
    onSuccess: (...args) => {
      !noRefetch &&
        queryClient.invalidateQueries({
          queryKey: getCompetitorsQueryOptions().queryKey,
        });
      onSuccess?.(...args);
    },
    ...rest,
    mutationFn: updateCompetitor,
  });
};
