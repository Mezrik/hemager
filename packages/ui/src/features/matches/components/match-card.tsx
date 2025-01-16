import { Trans } from '@lingui/macro';
import { Eye, Pencil } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { Match } from '@/generated/server';

import { MatchParticipant } from '../types';

type MatchCardProps = {
  match: Match;
  participantOne: MatchParticipant;
  participantTwo: MatchParticipant;
  onPreview: VoidFunction;
  onEdit: VoidFunction;
};

export const MatchCard: FC<MatchCardProps> = ({
  match,
  participantOne,
  participantTwo,
  onPreview,
  onEdit,
}) => {
  return (
    <div className="w-full space-y-1.5 rounded-lg bg-gray-100 px-4 py-2  transition-colors">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs uppercase tracking-wider text-gray-400">
            <Trans>Match</Trans>
          </span>
        </div>
        <div className="flex justify-end gap-2">
          <Button className="cursor-pointer" onClick={onPreview} variant="outline" size="xs">
            <Eye className="size-4" />
            <span className="sr-only">
              <Trans>Preview</Trans>
            </span>
          </Button>
          <Button className="cursor-pointer" variant="outline" size="xs" onClick={onEdit}>
            <Pencil className="size-4" />
            <span className="sr-only">
              <Trans>Edit</Trans>
            </span>
          </Button>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <span>
          {participantOne.firstname} {participantOne.surname}
        </span>
        <span>{participantOne.points ?? 0}</span>
      </div>
      <div className="flex justify-between gap-4">
        <span>
          {participantTwo.firstname} {participantTwo.surname}
        </span>
        <span>{participantTwo.points ?? 0}</span>
      </div>
    </div>
  );
};
