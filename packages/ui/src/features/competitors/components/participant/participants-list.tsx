import { useParticipants } from '@/features/competitors/api/get-participants';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CZ } from 'country-flag-icons/react/3x2';
import { useLingui } from '@lingui/react';
import { msg } from '@lingui/macro';

export const ParticipantsList: FC<{ competitionId: UUID }> = ({ competitionId }) => {
  const { _ } = useLingui();

  const participantsQuery = useParticipants({ competitionId });

  if (participantsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const participants = participantsQuery.data;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">{_(msg`Nation`)}</TableHead>
          <TableHead>{_(msg`Name`)}</TableHead>
          <TableHead>{_(msg`Deployment No.`)}</TableHead>
          <TableHead>{_(msg`Points`)}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants?.map((participant) => (
          <TableRow>
            <TableCell>
              <CZ title={_(msg`Czech Republic`)} className="size-6" />
            </TableCell>
            <TableCell>
              {participant.competitor.firstname} {participant.competitor.surname}
            </TableCell>
            <TableCell>{participant.deploymentNumber}</TableCell>
            <TableCell>{participant.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
