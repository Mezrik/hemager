import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Spinner } from '@/components/ui/spinner';

import { useClubs } from '../../api/get-clubs';
import { useCompetitor } from '../../api/get-competitor';
import { useUpdateCompetitor } from '../../api/update-competitor';
import { CompetitorEditForm } from '../forms/competitor-edit-form';

const FORM_ID = 'create-competitor-form';

type UpdateCompetitorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: UUID;
};

const UpdateCompetitorForm: FC<{ onSubmit: () => void; id: UUID }> = ({ onSubmit, id }) => {
  const createCompetitorMutation = useUpdateCompetitor();
  const competitorQuery = useCompetitor({ competitorId: id });
  const clubsQuery = useClubs();

  if (competitorQuery.isLoading || clubsQuery.isLoading) return <Spinner />;

  const contestant = competitorQuery.data?.unwrapOrElse((err) => err);
  const clubs = clubsQuery.data?.unwrapOrElse((err) => err);

  if (clubs && 'cause' in clubs) return <div>{clubs.cause}</div>;
  if (contestant && 'cause' in contestant) return <div>{contestant.cause}</div>;

  return (
    <CompetitorEditForm
      formID={FORM_ID}
      onSubmit={(values) => {
        createCompetitorMutation.mutate({ data: values, id });
        onSubmit();
      }}
      defaultValues={{
        ...(contestant ?? {}),
        clubId: contestant?.club?.id,
      }}
      clubs={clubs ?? []}
    />
  );
};

export const UpdateCompetitorDrawer: FC<UpdateCompetitorProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Update Competitor`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <UpdateCompetitorForm onSubmit={() => props.onOpenChange(false)} id={props.id} />
        </div>

        <DrawerFooter>
          <Button form={FORM_ID}>
            <Trans>Submit</Trans>
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">
              <Trans>Cancel</Trans>
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const UpdateCompetitorDialog: FC<UpdateCompetitorProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Update Competitor`)}</DialogTitle>
        </DialogHeader>

        <UpdateCompetitorForm onSubmit={() => props.onOpenChange(false)} id={props.id} />

        <DialogFooter>
          <Button form={FORM_ID}>
            <Trans>Submit</Trans>
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateCompetitor: FC<UpdateCompetitorProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <UpdateCompetitorDialog {...props} />;
  }

  return <UpdateCompetitorDrawer {...props} />;
};
