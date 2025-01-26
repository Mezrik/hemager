import { ClubDto, Country, GenderEnum } from '@hemager/api-types';
import { I18n } from '@lingui/core';
import { msg, t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { CalendarIcon } from 'lucide-react';
import { FC } from 'react';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { getGenderCaption } from '@/features/competitions/helpers';
import { cn } from '@/utils/class-names';
import { formatUIDate } from '@/utils/date';
import { spaceOnCapitalLetter } from '@/utils/string';

export const editCompetitorInputSchema = z.object({
  firstname: z.string().min(1, t`Firstname is required`),
  surname: z.string().min(1, t`Surname is required`),
  gender: z.nativeEnum(GenderEnum).optional(),
  birthdate: z.date().optional(),
  clubId: z.string().nanoid().optional(),
  rating: z.coerce.number().optional(),
  nationality: z.nativeEnum(Country).optional(),
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
  clubs: ClubDto[];
  formID: string;
  defaultValues?: Partial<z.infer<typeof editCompetitorInputSchema>>;
};

export const CompetitorEditForm: FC<CompetitorEditFormProps> = ({
  onSubmit,
  formID,
  defaultValues,
  clubs,
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
              className="grow"
              error={formState.errors['firstname']}
              registration={register('firstname')}
            />
            <Input
              label={_(msg`Surname`)}
              className="grow"
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
            label={_(msg`Rating`)}
            error={formState.errors['rating']}
            type="number"
            registration={register('rating')}
          />

          <FormField
            control={control}
            name="clubId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>Club</Trans>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a club" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {clubs.map((c) => (
                      <SelectItem value={c.id} key={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>Nationality</Trans>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(Country).map(([key, value]) => (
                      <SelectItem value={value} key={value}>
                        {spaceOnCapitalLetter(key)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
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
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
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
