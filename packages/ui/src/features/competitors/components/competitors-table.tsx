import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { getGenderAbbrv } from '@/features/competitions/helpers';
import { CompetitorResult } from '@/generated/server';
import { formatUIDate } from '@/utils/date';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CircleAlert, Pencil, Trash } from 'lucide-react';
import { FC, useState } from 'react';
import { UpdateCompetitor } from './dialog/update-competitor';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

export const CompetitorsTable: FC<{
  data: CompetitorResult[];
  selected: Set<UUID>;
  onSelect: (id: UUID) => void;
}> = ({ data, selected, onSelect }) => {
  const { _ } = useLingui();

  const [editCompetitorId, setEditCompetitorId] = useState<UUID | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Trans>#</Trans>
            </TableHead>
            <TableHead>
              <Trans>Name</Trans>
            </TableHead>
            <TableHead>
              <Trans>Club</Trans>
            </TableHead>
            <TableHead>
              <Trans>Gender</Trans>
            </TableHead>
            <TableHead>
              <Trans>License</Trans>
            </TableHead>
            <TableHead>
              <Trans>Birthday</Trans>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((comp) => {
            return (
              <TableRow key={comp.id} className="group">
                <TableCell>
                  <Checkbox
                    onCheckedChange={() => onSelect(comp.id)}
                    checked={selected.has(comp.id)}
                  />
                </TableCell>
                <TableCell className="flex items-center gap-2">
                  <span>
                    {comp.firstname} {comp.surname}
                  </span>
                  {comp.hasMissingInfo && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="p-0.5 rounded-full bg-destructive">
                          <CircleAlert className="size-4 text-white" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <Trans>Missing info</Trans>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </TableCell>
                <TableCell>{comp.club?.name}</TableCell>
                <TableCell>{getGenderAbbrv(comp.gender, _)}</TableCell>
                <TableCell>{comp.license}</TableCell>
                <TableCell>{comp.birthdate ? formatUIDate(comp.birthdate) : '-'}</TableCell>
                <TableCell className="opacity-0 group-hover:opacity-100 flex justify-end">
                  <Button size="xs" variant="ghost" onClick={() => setEditCompetitorId(comp.id)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button size="xs" variant="ghost" onClick={() => {}}>
                    <Trash className="size-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {!!editCompetitorId && (
        <UpdateCompetitor
          open={!!editCompetitorId}
          onOpenChange={(open) => {
            !open && setEditCompetitorId(null);
          }}
          id={editCompetitorId}
        />
      )}
    </>
  );
};
