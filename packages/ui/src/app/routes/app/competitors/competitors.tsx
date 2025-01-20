import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CaretDownIcon } from '@radix-ui/react-icons';
import { QueryClient } from '@tanstack/react-query';
import { ImportIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { BasicPageLayout } from '@/components/layouts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { InputBase } from '@/components/ui/form';
import {
  getCompetitorsQueryOptions,
  useCompetitors,
} from '@/features/competitors/api/get-competitors';
import { CompetitorsTable } from '@/features/competitors/components/competitors-table';
import { CreateCompetitor } from '@/features/competitors/components/dialog/create-competitor';
import { FillMissingData } from '@/features/competitors/components/dialog/fill-missing-data';
import { ImportCompetitorsDialog } from '@/features/competitors/components/dialog/import-competitors';
import { APIError } from '@hemager/api-types';

export const competitorsLoader = (queryClient: QueryClient) => async () => {
  const query = getCompetitorsQueryOptions();

  return queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query));
};

export const CompetitorsRoute = () => {
  const { _ } = useLingui();
  const competitorsQuery = useCompetitors({});

  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [missingDataDialogOpen, setMissingDataDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selected, setSelected] = useState<Set<UUID>>(new Set());

  const competitors = competitorsQuery.data?.unwrapOrElse<APIError>((err) => err);

  if (!competitors || 'cause' in competitors) {
    return <Trans>Contestants not found: {competitors?.cause}</Trans>;
  }

  const handleSelect = (id: UUID) => {
    console.log(id);
    setSelected((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);

      return newSet;
    });
  };

  const handleImportClose = () => {
    setImportDialogOpen(false);
    competitorsQuery.refetch();
  };

  if (competitorsQuery.isLoading) {
    return <BasicPageLayout title={_(msg`Competitors`)}>Loading...</BasicPageLayout>;
  }

  const competitorsMissingData = competitors?.filter((c) => c.hasMissingInfo);

  const filteredData = competitors?.filter((comp) => {
    return `${comp.firstname} ${comp.surname}`.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <BasicPageLayout
      title={_(msg`Competitors`)}
      actions={
        <div className="flex gap-2">
          <Button className="gap-2" variant="default" onClick={() => setImportDialogOpen(true)}>
            <ImportIcon className="size-4" />
            <span className="hidden">
              <Trans>Import competitors</Trans>
            </span>
          </Button>
          <Button className="gap-2" variant="secondary" onClick={() => setCreateDialogOpen(true)}>
            <PlusIcon className="size-4" />
            <span className="hidden sm:inline">
              <Trans>Add competitor</Trans>
            </span>
          </Button>
        </div>
      }
      className="flex min-h-0 flex-col"
    >
      {!competitors || competitors.length <= 0 ? (
        <Trans>No competitors found</Trans>
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
              <InputBase
                placeholder={_(msg`Type here to search`)}
                className="max-w-56"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {selected.size > 0 && (
                <Button>
                  Actions <CaretDownIcon className="size-4" />
                </Button>
              )}
            </div>

            {competitorsMissingData && competitorsMissingData?.length > 0 && (
              <Badge
                className="ml-2 cursor-pointer"
                variant="destructive"
                role="button"
                onClick={() => setMissingDataDialogOpen(true)}
              >
                <Trans>{competitorsMissingData.length} competitors are missing info</Trans>
              </Badge>
            )}
          </div>
          <div className="grow overflow-y-auto">
            <CompetitorsTable
              data={filteredData ?? []}
              onSelect={handleSelect}
              selected={selected}
            />
          </div>
        </>
      )}

      <ImportCompetitorsDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImportSuccess={handleImportClose}
      />

      <CreateCompetitor open={createDialogOpen} onOpenChange={setCreateDialogOpen} />

      <FillMissingData
        onOpenChange={setMissingDataDialogOpen}
        open={missingDataDialogOpen}
        competitorsWithMissingData={competitorsMissingData ?? []}
      />
    </BasicPageLayout>
  );
};
