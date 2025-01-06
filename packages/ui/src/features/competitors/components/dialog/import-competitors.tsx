import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormMessage, InputBase } from '@/components/ui/form';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { FC } from 'react';
import { importCompetitorInputSchema, useImportCompetitor } from '../../api/import-competitor';
import { toast } from '@/hooks/ui/use-toast';

type ImportCompetitorsProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSuccess: () => void;
};

const FORM_ID = 'import-competitor-form';

export const ImportCompetitorsDialog: FC<ImportCompetitorsProps> = (props) => {
  const { _ } = useLingui();

  const importCompetitorMutation = useImportCompetitor({
    mutationConfig: {
      onSuccess: () => {
        toast({
          description: _(msg`Competitor(s) imported successfully`),
          variant: 'success',
        });

        props.onImportSuccess();
      },
    },
  });

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{_(msg`Import competitors`)}</DialogTitle>
        </DialogHeader>

        <Form
          id={FORM_ID}
          onSubmit={(values) => {
            importCompetitorMutation.mutate({ data: values });
          }}
          schema={importCompetitorInputSchema}
        >
          {({ control }) => (
            <FormField
              control={control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Choose file to import</Trans>
                  </FormLabel>
                  <InputBase
                    placeholder={_(msg`Choose file`)}
                    type="file"
                    accept="text/csv, application/csv"
                    onChange={(e) => field.onChange(e.target.files?.[0])}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </Form>

        <DialogFooter>
          <Button form={FORM_ID} type="submit">
            <Trans>Import</Trans>
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
