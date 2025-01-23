import { ContestDto, DeploymentCriteria } from '@hemager/api-types';
import { I18n } from '@lingui/core';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form';
import {
  updateCompetitionParametersInputSchema,
  useUpdateCompetitionParameters,
} from '@/features/competitions/api/update-competition-parameters';
import { useToast } from '@/hooks/ui/use-toast';

export type CompetitionParameters = Pick<
  ContestDto,
  'eliminationHits' | 'groupHits' | 'deploymentCriteria' | 'expectedParticipants'
>;

const getCompetitionParametersOptions = (i18n: I18n) => [
  {
    value: DeploymentCriteria.rating,
    label: i18n._(msg`Rating`),
  },
  {
    value: DeploymentCriteria.club,
    label: i18n._(msg`Club`),
  },
  {
    value: DeploymentCriteria.nationality,
    label: i18n._(msg`Nationality`),
  },
];

type UpdateCompetitionParametersProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: UUID;
  parameters?: CompetitionParameters;
};

const FORM_ID = 'update-competition-parameters-form';

export const UpdateCompetitionParametersForm: FC<{
  onSubmit: () => void;
  id: UUID;
  parameters?: CompetitionParameters;
}> = ({ onSubmit, id, parameters }) => {
  const { toast } = useToast();
  const { _, i18n } = useLingui();

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

  const deploymentOptions = getCompetitionParametersOptions(i18n);

  return (
    <Form
      id={FORM_ID}
      onSubmit={(values) => {
        updateCompetitionParametersMutation.mutate({ data: values, id });
        onSubmit();
      }}
      schema={updateCompetitionParametersInputSchema}
      options={{
        defaultValues: { deploymentCriteria: [], ...parameters },
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

          <FormField
            control={control}
            name="deploymentCriteria.0"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>First deployment criteria</Trans>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a criterion" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {deploymentOptions.map((d) => (
                      <SelectItem value={d.value} key={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
