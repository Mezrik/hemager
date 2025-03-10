import { ContestantDto } from '@hemager/api-types';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC, useEffect, useState } from 'react';
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
import { useUpdateCompetitor } from '../../api/update-competitor';
import { CompetitorEditForm } from '../forms/competitor-edit-form';

const FORM_ID = 'create-competitor-form';

type FillMissingDataProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competitorsWithMissingData: ContestantDto[];
};

const FillMissingDataForm: FC<FillMissingDataProps> = ({
  competitorsWithMissingData,
  onOpenChange,
}) => {
  const [editingI, setEditingI] = useState(0);

  const clubsQuery = useClubs();

  useEffect(() => {
    console.log(
      editingI,
      competitorsWithMissingData.length,
      editingI >= competitorsWithMissingData.length,
    );

    if (editingI >= competitorsWithMissingData.length) {
      onOpenChange(false);
    }
  }, [editingI]);

  const handleNext = () => {
    setEditingI((prev) => prev + 1);
  };

  const updateCompetitorMutation = useUpdateCompetitor({
    mutationConfig: {
      onSuccess: handleNext,
    },
  });

  const competitor = competitorsWithMissingData[editingI];

  console.log(competitor);
  if (!competitor) return null;

  if (clubsQuery.isLoading) return <Spinner />;

  const clubs = clubsQuery.data?.unwrapOrElse((err) => err);

  if (clubs && 'cause' in clubs) return <div>{clubs.cause}</div>;

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Button variant="secondary" onClick={handleNext} className="grow">
          <Trans>Skip</Trans>
        </Button>
        <span className="text-sm">
          <Trans>
            Editing: {editingI + 1}/{competitorsWithMissingData.length}
          </Trans>
        </span>
      </div>
      <CompetitorEditForm
        formID={FORM_ID}
        onSubmit={(values) => {
          updateCompetitorMutation.mutate({ data: values, id: competitor.id });
        }}
        defaultValues={{
          ...(competitor ?? {}),
          birthdate: competitor.birthdate ? new Date(competitor.birthdate) : undefined,
        }}
        clubs={clubs ?? []}
      />
    </>
  );
};

export const FillMissingDataDrawer: FC<FillMissingDataProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Update Competitor`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <FillMissingDataForm {...props} />
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

export const FillMissingDataDialog: FC<FillMissingDataProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Update Competitor`)}</DialogTitle>
        </DialogHeader>

        <FillMissingDataForm {...props} />

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

export const FillMissingData: FC<FillMissingDataProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <FillMissingDataDialog {...props} />;
  }

  return <FillMissingDataDrawer {...props} />;
};
