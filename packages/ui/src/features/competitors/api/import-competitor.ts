import { getPostCompetitorsImportUrl } from '@/generated/server';
import { MutationConfig } from '@/lib/react-query';
import { t } from '@lingui/macro';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export const importCompetitorInputSchema = z.object({
  file: z.instanceof(File, { message: t`File is required` }),
});

export type ImportCompetitorInput = z.infer<typeof importCompetitorInputSchema>;

export const importCompetitor = async ({ data }: { data: ImportCompetitorInput }) => {
  const formData = new FormData();
  formData.append('file', data.file);

  const response = await fetch(getPostCompetitorsImportUrl(), {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to upload CSV file');
  }

  return response;
};

type UseImportCompetitorOptions = {
  mutationConfig?: MutationConfig<typeof importCompetitor>;
};

export const useImportCompetitor = ({ mutationConfig }: UseImportCompetitorOptions = {}) => {
  return useMutation({
    ...mutationConfig,
    mutationFn: importCompetitor,
  });
};
