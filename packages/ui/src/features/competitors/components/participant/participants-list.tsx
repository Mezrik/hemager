import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CZ } from 'country-flag-icons/react/3x2';
import { FC } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useParticipants } from '@/features/competitors/api/get-participants';
import { APIError } from '@hemager/api-types';

export const ParticipantsList: FC<{ competitionId: UUID }> = ({ competitionId }) => {
  const { _ } = useLingui();

  const participantsQuery = useParticipants({ competitionId });

  if (participantsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const participants = participantsQuery.data?.unwrapOrElse<APIError>((err) => err);

  if (!participants || 'cause' in participants) {
    return <div>Participants not found: {participants?.cause}</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">{_(msg`Nation`)}</TableHead>
          <TableHead>{_(msg`Name`)}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants?.map((participant) => (
          <TableRow>
            <TableCell>
              <CZ title={_(msg`Czech Republic`)} className="size-6" />
            </TableCell>
            <TableCell>
              {participant.contestant.firstname} {participant.contestant.surname}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
