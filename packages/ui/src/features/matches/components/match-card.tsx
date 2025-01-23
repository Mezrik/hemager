import { MatchDto } from '@hemager/api-types';
import { Trans } from '@lingui/macro';
import { CrownIcon, Eye, Pencil } from 'lucide-react';
import { FC } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/class-names';

type MatchCardProps = {
  match: MatchDto;
  onPreview: VoidFunction;
  onEdit: VoidFunction;
};

export const MatchCard: FC<MatchCardProps> = ({ match, onPreview, onEdit }) => {
  const [participantOne, participantTwo] = match.participants;
  const [participantOnePoints, participantTwoPoints] = match.points;

  return (
    <div
      className={cn(
        'w-full space-y-1.5 rounded-lg px-4 py-2 transition-colors',
        match.matchEnd ? 'bg-gray-100' : 'bg-gray-300',
      )}
    >
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
          {!match.matchEnd && (
            <Button className="cursor-pointer" variant="outline" size="xs" onClick={onEdit}>
              <Pencil className="size-4" />
              <span className="sr-only">
                <Trans>Edit</Trans>
              </span>
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <div>
            {participantOne.contestant.firstname} {participantOne.contestant.surname}
          </div>
          {participantOne.contestant.id === match.winner && (
            <CrownIcon className="size-4 text-yellow-400" />
          )}
        </div>
        <div>{participantOnePoints ?? 0}</div>
      </div>
      <div className="flex justify-between gap-4">
        <div className="flex items-center gap-2">
          <div>
            {participantTwo.contestant.firstname} {participantTwo.contestant.surname}
          </div>
          {participantTwo.contestant.id === match.winner && (
            <CrownIcon className="size-4 text-yellow-400" />
          )}
        </div>
        <div>{participantTwoPoints ?? 0}</div>
      </div>
    </div>
  );
};
