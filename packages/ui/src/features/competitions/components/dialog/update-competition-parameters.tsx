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
import { I18n } from '@lingui/core';
import { useToast } from '@/hooks/ui/use-toast';
import { Form, Input, RadioGroupFormField, RadioOption } from '@/components/ui/form';
import { CompetitionParameters, DeploymentTypeEnum, GenderEnum } from '@/generated/server';
import { useLingui } from '@lingui/react';
import {
  updateCompetitionParametersInputSchema,
  useUpdateCompetitionParameters,
} from '@/features/competitions/api/update-competition-parameters';
import { getDeploymentTypeCaption } from '@/features/competitions/helpers';

type UpdateCompetitionParametersProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: UUID;
  parameters?: CompetitionParameters;
};

const FORM_ID = 'update-competition-parameters-form';

const getDeploymentOptions = (_: I18n['_']): RadioOption[] => [
  {
    label: getDeploymentTypeCaption(GenderEnum.male, _),
    value: DeploymentTypeEnum.deployment,
  },
];

export const UpdateCompetitionParametersForm: FC<{
  onSubmit: () => void;
  id: UUID;
  parameters?: CompetitionParameters;
}> = ({ onSubmit, id, parameters }) => {
  const { toast } = useToast();
  const { _ } = useLingui();

  const updateCompetitionParametersMutation = useUpdateCompetitionParameters({
    mutationConfig: {
      onSuccess: () => {
        toast({
          description: 'Competition parameters updated successfully',
          variant: 'success',
        });
      },
    },
  });

  return (
    <Form
      id={FORM_ID}
      onSubmit={(values) => {
        updateCompetitionParametersMutation.mutate({ data: values, id });
        onSubmit();
      }}
      schema={updateCompetitionParametersInputSchema}
      options={{
        defaultValues: parameters,
      }}
    >
      {({ register, formState, control }) => (
        <>
          <Input
            label={_(msg`Expected number of competitors`)}
            error={formState.errors['expectedParticipants']}
            registration={register('expectedParticipants')}
            type="number"
          />

          <Input
            label={_(msg`Groups hits`)}
            error={formState.errors['groupHits']}
            registration={register('groupHits')}
            type="number"
          />

          <Input
            label={_(msg`Elimination hits`)}
            error={formState.errors['eliminationHits']}
            registration={register('eliminationHits')}
            type="number"
          />

          <Input
            label={_(msg`Qualification based on rounds`)}
            error={formState.errors['qualificationBasedOnRounds']}
            registration={register('qualificationBasedOnRounds')}
            type="number"
          />

          <Input
            label={_(msg`Rounds count`)}
            error={formState.errors['roundsCount']}
            registration={register('roundsCount')}
            type="number"
          />

          <fieldset className="flex gap-12">
            <RadioGroupFormField
              label={_(msg`Deployment type`)}
              name="deploymentType"
              control={control}
              options={getDeploymentOptions(_)}
            />
          </fieldset>
        </>
      )}
    </Form>
  );
};

export const UpdateCompetitionParametersDrawer: FC<UpdateCompetitionParametersProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Drawer open={props.open} onOpenChange={props.onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{_(msg`Update competition parameters`)}</DrawerTitle>
        </DrawerHeader>

        <div className="p-4 pb-0">
          <UpdateCompetitionParametersForm
            onSubmit={() => props.onOpenChange(false)}
            id={props.id}
            parameters={props.parameters}
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

export const UpdateCompetitionParametersDialog: FC<UpdateCompetitionParametersProps> = (props) => {
  const { _ } = useLingui();

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Update competition parameters`)}</DialogTitle>
        </DialogHeader>

        <UpdateCompetitionParametersForm
          onSubmit={() => props.onOpenChange(false)}
          id={props.id}
          parameters={props.parameters}
        />

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

export const UpdateCompetitionParameters: FC<UpdateCompetitionParametersProps> = (props) => {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return <UpdateCompetitionParametersDialog {...props} />;
  }

  return <UpdateCompetitionParametersDrawer {...props} />;
};
