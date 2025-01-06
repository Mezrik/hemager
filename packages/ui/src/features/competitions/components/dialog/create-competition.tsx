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
import { useCreateCompetition } from '../../api/create-competition';

import { useLingui } from '@lingui/react';
import { EditCompetitionForm } from '../forms/edit-competition-form';

type CreateCompetitionProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FORM_ID = 'create-competition-form';

export const CreateCompetitionForm: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const { toast } = useToast();

  const createCompetitionMutation = useCreateCompetition({
    mutationConfig: {
      onSuccess: () => {
        toast({
          description: 'Competition created successfully',
          variant: 'success',
        });
      },
    },
  });

  return (
    <EditCompetitionForm
      formID={FORM_ID}
      onSubmit={(values) => {
        createCompetitionMutation.mutate({ data: values });
        onSubmit();
      }}
    />
  );
};

export const CreateCompetitionDrawer: FC<CreateCompetitionProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Create Competition`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <CreateCompetitionForm onSubmit={() => props.onOpenChange(false)} />
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

export const CreateCompetitionDialog: FC<CreateCompetitionProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Create Competition`)}</DialogTitle>
        </DialogHeader>

        <CreateCompetitionForm onSubmit={() => props.onOpenChange(false)} />

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

export const CreateCompetition: FC<CreateCompetitionProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <CreateCompetitionDialog {...props} />;
  }

  return <CreateCompetitionDrawer {...props} />;
};
