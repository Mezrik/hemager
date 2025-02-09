import { APIError, ContestResultDto } from '@hemager/api-types';
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
import { useParticipants } from '@/features/competitions/api/get-participants';

import { useContestResults } from '../../api/get-contest-result';

export const ParticipantsList: FC<{ competitionId: UUID }> = ({ competitionId }) => {
  const { _ } = useLingui();

  const participantsQuery = useParticipants({ competitionId });

  const resultsQuery = useContestResults({ contestId: competitionId });

  if (participantsQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const participants = participantsQuery.data?.unwrapOrElse<APIError>((err) => err);

  if (!participants || 'cause' in participants) {
    return <div>Participants not found: {participants?.cause}</div>;
  }

  const results = resultsQuery.data?.unwrapOr([] as ContestResultDto[]);

  const resultsByParticipantId = results?.reduce(
    (acc, result: ContestResultDto) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      acc[result.contestantId] = result;
      return acc;
    },
    {} as Record<UUID, ContestResultDto>,
  );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">{_(msg`Nation`)}</TableHead>
          <TableHead>{_(msg`Name`)}</TableHead>
          <TableHead>{_(msg`Wins`)}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {participants?.map((participant) => (
          <TableRow key={participant.contestant.id}>
            <TableCell>
              <CZ title={_(msg`Czech Republic`)} className="size-6" />
            </TableCell>
            <TableCell>
              {participant.contestant.firstname} {participant.contestant.surname}
            </TableCell>
            <TableCell>
              {resultsByParticipantId?.[participant.contestant.id]?.winCount || 0}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
