import { useLingui } from '@lingui/react';
import { FC } from 'react';
import { useCompetitionCategories } from '../../api/get-competition-categories';
import { useWeapons } from '../../api/get-weapons';
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
import { CompetitionTypeEnum, GenderEnum } from '@/generated/server';
import { msg, t, Trans } from '@lingui/macro';
import { z } from 'zod';
import { I18n } from '@lingui/core';
import { getCompetionTypeCaption, getGenderCaption } from '../../helpers';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { formatUIDate } from '@/utils/date';
import { cn } from '@/utils/class-names';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const getCompetitionTypeOptions = (_: I18n['_']): RadioOption[] => [
  {
    label: getCompetionTypeCaption(CompetitionTypeEnum.international, _),
    value: CompetitionTypeEnum.international,
  },
  {
    label: getCompetionTypeCaption(CompetitionTypeEnum.national, _),
    value: CompetitionTypeEnum.national,
  },
];

const getGenderOptions = (_: I18n['_']): RadioOption[] => [
  {
    label: getGenderCaption(GenderEnum.male, _),
    value: GenderEnum.male,
  },
  {
    label: getGenderCaption(GenderEnum.female, _),
    value: GenderEnum.female,
  },
  {
    label: getGenderCaption(GenderEnum.mixed, _),
    value: GenderEnum.mixed,
  },
];

export const edtiCompetitionInputSchema = z.object({
  categoryId: z.string().uuid(t`Select correct category`),
  competitionType: z.nativeEnum(CompetitionTypeEnum),
  date: z.date({ message: t`Date of the competition is required` }),
  federationName: z.string().min(1, t`Federation name is required`),
  gender: z.nativeEnum(GenderEnum),
  name: z.string().min(1, t`Competition name is required`),
  organizerName: z.string().min(1, t`Organizer name is required`),
  weaponId: z.string().uuid(t`Select correct weapon`),
});

type FormProps = {
  onSubmit: (values: z.infer<typeof edtiCompetitionInputSchema>) => void;
  formID: string;
  defaultValues?: Partial<z.infer<typeof edtiCompetitionInputSchema>>;
};

export const EditCompetitionForm: FC<FormProps> = ({ onSubmit, formID, defaultValues }) => {
  const { _ } = useLingui();

  const categoriesQuery = useCompetitionCategories();
  const weaponsQuery = useWeapons();

  return (
    <Form
      id={formID}
      onSubmit={onSubmit}
      schema={edtiCompetitionInputSchema}
      options={{
        defaultValues,
      }}
    >
      {({ register, formState, control }) => (
        <>
          <Input
            label={_(msg`Competition name`)}
            error={formState.errors['name']}
            registration={register('name')}
          />

          <Input
            label={_(msg`Organizer name`)}
            error={formState.errors['organizerName']}
            registration={register('organizerName')}
          />

          <Input
            label={_(msg`Federation name`)}
            error={formState.errors['federationName']}
            registration={register('federationName')}
          />

          <fieldset className="flex gap-12">
            <RadioGroupFormField
              label={_(msg`Competition type`)}
              name="competitionType"
              control={control}
              options={getCompetitionTypeOptions(_)}
            />
            <RadioGroupFormField
              label={_(msg`Gender`)}
              name="gender"
              control={control}
              options={getGenderOptions(_)}
            />
          </fieldset>

          {categoriesQuery.data && (
            <FormField
              control={control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Category</Trans>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a competition category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoriesQuery.data?.map((c) => (
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
          )}

          {weaponsQuery.data && (
            <FormField
              control={control}
              name="weaponId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>Weapon</Trans>
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a competition weapon" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {weaponsQuery.data?.map((w) => (
                        <SelectItem value={w.id} key={w.id}>
                          {w.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  <Trans>Date of competition</Trans>
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
