import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroupFormField,
  RadioOption,
} from '@/components/ui/form';
import { getGenderCaption } from '@/features/competitions/helpers';
import { GenderEnum } from '@/generated/server';
import { msg, t, Trans } from '@lingui/macro';
import { I18n } from '@lingui/core';
import { useLingui } from '@lingui/react';
import { FC } from 'react';
import { z } from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/class-names';
import { formatUIDate } from '@/utils/date';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

export const editCompetitorInputSchema = z.object({
  firstname: z.string().min(1, t`Firstname is required`),
  surname: z.string().min(1, t`Surname is required`),
  gender: z.nativeEnum(GenderEnum),
  license: z.string().min(1, t`License is required`),
  licenseFie: z.string(),
  birthdate: z.date({ message: t`Date of birth is required` }),
  clubId: z.string().uuid().optional(),
});

const getGenderOptions = (_: I18n['_']): RadioOption[] => [
  {
    label: getGenderCaption(GenderEnum.male, _, false),
    value: GenderEnum.male,
  },
  {
    label: getGenderCaption(GenderEnum.female, _, false),
    value: GenderEnum.female,
  },
  {
    label: getGenderCaption(GenderEnum.mixed, _, false),
    value: GenderEnum.mixed,
  },
];

type CompetitorEditFormProps = {
  onSubmit: (values: z.infer<typeof editCompetitorInputSchema>) => void;
  formID: string;
  defaultValues?: Partial<z.infer<typeof editCompetitorInputSchema>>;
};

export const CompetitorEditForm: FC<CompetitorEditFormProps> = ({
  onSubmit,
  formID,
  defaultValues,
}) => {
  const { _ } = useLingui();

  return (
    <Form
      id={formID}
      onSubmit={onSubmit}
      schema={editCompetitorInputSchema}
      options={{
        defaultValues,
      }}
    >
      {({ register, formState, control }) => (
        <>
          <fieldset className="flex gap-4">
            <Input
              label={_(msg`Firstname`)}
              className="flex-grow"
              error={formState.errors['firstname']}
              registration={register('firstname')}
            />
            <Input
              label={_(msg`Surname`)}
              className="flex-grow"
              error={formState.errors['surname']}
              registration={register('surname')}
            />
          </fieldset>
          <RadioGroupFormField
            label={_(msg`Gender`)}
            name="gender"
            control={control}
            options={getGenderOptions(_)}
          />
          <Input
            label={_(msg`License`)}
            error={formState.errors['license']}
            registration={register('license')}
          />
          <Input
            label={_(msg`License FIE`)}
            error={formState.errors['licenseFie']}
            registration={register('licenseFie')}
          />

          <FormField
            control={control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <Trans>Birthdate</Trans>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          formatUIDate(field.value)
                        ) : (
                          <span>
                            <Trans>Pick a date</Trans>
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </Form>
  );
};
