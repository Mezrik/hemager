import { FC } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { msg, Trans } from '@lingui/macro';
import { useToast } from '@/hooks/ui/use-toast';
import { useUpdateCompetition } from '@/features/competitions/api/update-competition';

import { useLingui } from '@lingui/react';
import { EditCompetitionForm } from '../forms/edit-competition-form';
import { useCompetition } from '../../api/get-competition';
import { Spinner } from '@/components/ui/spinner';

type UpdateCompetitionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: UUID;
};

const FORM_ID = 'create-competition-form';

export const UpdateCompetitionForm: FC<{ onSubmit: () => void; id: UUID }> = ({ onSubmit, id }) => {
  const { toast } = useToast();

  const competition = useCompetition({ competitionId: id });

  if (competition.isLoading) return <Spinner />;

  const updateCompetitionMutation = useUpdateCompetition({
    mutationConfig: {
      onSuccess: () => {
        toast({
          description: 'Competition updated successfully',
          variant: 'success',
        });
      },
    },
  });

  return (
    <EditCompetitionForm
      formID={FORM_ID}
      onSubmit={(values) => {
        updateCompetitionMutation.mutate({ data: values, id });
        onSubmit();
      }}
      defaultValues={{
        ...competition.data,
        date: competition.data?.date ? new Date(competition.data?.date) : undefined,
      }}
    />
  );
};

export const UpdateCompetitionDrawer: FC<UpdateCompetitionProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Create Competition`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <UpdateCompetitionForm onSubmit={() => props.onOpenChange(false)} id={props.id} />
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

export const UpdateCompetitionDialog: FC<UpdateCompetitionProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Create Competition`)}</DialogTitle>
        </DialogHeader>

        <UpdateCompetitionForm onSubmit={() => props.onOpenChange(false)} id={props.id} />

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

export const UpdateCompetition: FC<UpdateCompetitionProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <UpdateCompetitionDialog {...props} />;
  }

  return <UpdateCompetitionDrawer {...props} />;
};
