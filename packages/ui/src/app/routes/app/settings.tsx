import { BasicPageLayout } from '@/components/layouts';
import {
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/form';
import { locales, LocaleSwitchContext } from '@/i18n';
import { msg, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { QueryClient } from '@tanstack/react-query';
import { useContext } from 'react';

export const settingsLoader = (queryClient: QueryClient) => async () => {};

export const SettingsRoute = () => {
  const localizationContext = useContext(LocaleSwitchContext);
  const { _ } = useLingui();

  return (
    <BasicPageLayout title={_(msg`Settings`)}>
      <div className="space-y-2 w-80">
        <Label>
          <Trans>Language</Trans>
        </Label>
        <Select
          onValueChange={(value) => {
            localizationContext?.activate(value as keyof typeof locales);
          }}
          defaultValue={localizationContext?.locale}
        >
          <SelectTrigger>
            <SelectValue placeholder={_(msg`Select a language`)} />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(locales).map(([key, value]) => (
              <SelectItem value={key} key={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </BasicPageLayout>
  );
};
