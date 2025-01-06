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
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC } from 'react';
import { useCreateCompetitor } from '../../api/create-competitor';
import { useMediaQuery } from 'usehooks-ts';
import { CompetitorEditForm } from '../forms/competitor-edit-form';

const FORM_ID = 'create-competitor-form';

type CreateCompetitorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const CreateCompetitorForm: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const createCompetitorMutation = useCreateCompetitor();

  return (
    <CompetitorEditForm
      formID={FORM_ID}
      onSubmit={(values) => {
        createCompetitorMutation.mutate({ data: values });
        onSubmit();
      }}
    />
  );
};

export const CreateCompetitorDrawer: FC<CreateCompetitorProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Create Competitor`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <CreateCompetitorForm onSubmit={() => props.onOpenChange(false)} />
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

export const CreateCompetitorDialog: FC<CreateCompetitorProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Create Competitor`)}</DialogTitle>
        </DialogHeader>

        <CreateCompetitorForm onSubmit={() => props.onOpenChange(false)} />

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

export const CreateCompetitor: FC<CreateCompetitorProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <CreateCompetitorDialog {...props} />;
  }

  return <CreateCompetitorDrawer {...props} />;
};
