import { APIError } from '@hemager/api-types';
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
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  assignParticipantsInputSchema,
  useAssignParticipants,
} from '@/features/competitors/api/assign-participant';
import { useCompetitors } from '@/features/competitors/api/get-competitors';
import { useToast } from '@/hooks/ui/use-toast';

import { useParticipants } from '../../api/get-participants';

import { ParticipantDualList } from './participant-dual-list';

const FORM_ID = 'assign-competitors-form';

type AssignParticipantProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  competitionId: UUID;
  selectedParticipantIds: UUID[];
};

export const AssignParticipantsForm: FC<{
  onSubmit: () => void;
  competitionId: UUID;
  selectedParticipantIds: UUID[];
}> = ({ onSubmit, competitionId, selectedParticipantIds }) => {
  const { toast } = useToast();
  const { _ } = useLingui();

  const competitorsQuery = useCompetitors();

  const competitors = competitorsQuery.data?.unwrapOrElse<APIError>((err) => err);

  const assignParticipantMutation = useAssignParticipants({
    mutationConfig: {
      onSuccess: () => {
        toast({
          description: 'Competitors assigned successfully',
          variant: 'success',
        });
      },
    },
  });

  if (!competitors || 'cause' in competitors) {
    return <div>Participants not found: {competitors?.cause}</div>;
  }

  if (competitorsQuery.isLoading || !competitionId) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      id={FORM_ID}
      onSubmit={(values) => {
        assignParticipantMutation.mutate({ data: values });
        onSubmit();
      }}
      schema={assignParticipantsInputSchema}
      options={{
        defaultValues: {
          contestId: competitionId,
          competitorIds: selectedParticipantIds,
        },
      }}
    >
      {({ control, register }) => (
        <>
          <FormField
            control={control}
            name="competitorIds"
            render={({ field }) => (
              <FormItem>
                <ParticipantDualList
                  options={competitors || []}
                  onChange={field.onChange}
                  selected={field.value ?? []}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <input type="hidden" {...register('contestId')} />
        </>
      )}
    </Form>
  );
};

export const AssignParticipantDrawer: FC<AssignParticipantProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Assign Competitors`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <AssignParticipantsForm
            onSubmit={() => props.onOpenChange(false)}
            competitionId={props.competitionId}
            selectedParticipantIds={props.selectedParticipantIds}
          />
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

export const AssignParticipantDialog: FC<AssignParticipantProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog
      open={props.open}
      onOpenChange={props.onOpenChange}
      aria-describedby={_(msg`Assign Competitors`)}
    >
      <DialogContent size="lg">
        <DialogHeader>
          <DialogTitle>{_(msg`Assign Competitors`)}</DialogTitle>
        </DialogHeader>

        <AssignParticipantsForm
          onSubmit={() => props.onOpenChange(false)}
          competitionId={props.competitionId}
          selectedParticipantIds={props.selectedParticipantIds}
        />

        <DialogFooter>
          <Button form={FORM_ID}>
            <Trans>Submit</Trans>
          </Button>
          <DialogClose asChild>
            <Button variant="outline">
              <Trans>Cancel</Trans>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const AssignParticipant: FC<Omit<AssignParticipantProps, 'selectedParticipantIds'>> = (
  props,
) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const participantsQuery = useParticipants({ competitionId: props.competitionId });

  const participants = participantsQuery.data?.unwrapOrElse<APIError>((err) => err);

  if (!participants || 'cause' in participants) {
    return <div>Participants not found: {participants?.cause}</div>;
  }

  const selectedParticipantIds =
    participants?.map((participant) => participant.contestant.id) || [];

  if (isDesktop) {
    return <AssignParticipantDialog {...props} selectedParticipantIds={selectedParticipantIds} />;
  }

  return <AssignParticipantDrawer {...props} selectedParticipantIds={selectedParticipantIds} />;
};
