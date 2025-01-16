import { Trans } from '@lingui/macro';
import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { MatchChangeEnum } from '@/generated/server';

import { useMatch } from '../api/get-match';
import { processMatchState } from '../helpers';
import { MatchParticipant } from '../types';

type MatchPreviewBaseProps = {
  matchId: UUID;
  participantsById: Record<UUID, MatchParticipant>;
};
type MatchPreviewProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & MatchPreviewBaseProps;

const MatchPreviewBase: FC<MatchPreviewBaseProps> = ({ matchId, participantsById }) => {
  const matchQuery = useMatch({ matchId });

  if (matchQuery.isLoading) {
    return <div>Loading...</div>;
  }

  const match = matchQuery.data;

  if (!match) {
    return <div>Match not found</div>;
  }

  const participantOne = participantsById[match.participantOneId];
  const participantTwo = participantsById[match.participantTwoId];

  const matchState = processMatchState(match.state, participantOne.id, participantTwo.id);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            {participantOne.firstname} {participantOne.surname}
          </div>
          <div className="flex size-14 items-center justify-center rounded bg-primary text-xl text-primary-foreground">
            {matchState.participantOneScore}
          </div>
        </div>

        <div className="text-xl">
          <Trans>vs</Trans>
        </div>

        <div className="flex flex-row-reverse items-center gap-4">
          <div>
            {participantTwo.firstname} {participantTwo.surname}
          </div>
          <div className="flex size-14 items-center justify-center rounded bg-primary text-xl text-primary-foreground">
            {matchState.participantTwoScore}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {match.state.map((item) => (
          <div key={item.id} className="flex  gap-4">
            {item.change}{' '}
            <span className="font-semibold">
              {item.change === MatchChangeEnum.point_added &&
                (item.pointTo === participantOne.id
                  ? `${participantOne.firstname} ${participantOne.surname}`
                  : `${participantTwo.firstname} ${participantTwo.surname}`)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const MatchPreviewDialog: FC<MatchPreviewProps> = ({ open, onOpenChange, ...props }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>Match detail</Trans>
          </DialogTitle>
        </DialogHeader>
        <MatchPreviewBase {...props} />
      </DialogContent>
    </Dialog>
  );
};

const MatchPreviewDrawer: FC<MatchPreviewProps> = ({ open, onOpenChange, ...props }) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <Trans>Match detail</Trans>
          </DrawerTitle>
        </DrawerHeader>
        <MatchPreviewBase {...props} />
        <DrawerFooter>
          <DrawerClose className="w-full">
            <Trans>Cancel</Trans>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const MatchPreview: FC<MatchPreviewProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <MatchPreviewDialog {...props} />;
  }

  return <MatchPreviewDrawer {...props} />;
};
