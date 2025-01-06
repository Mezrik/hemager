import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

export const locales = {
  en: 'English',
  cs: 'Česky',
} as const;

export const defaultLocale = 'en';

export async function dynamicActivate(locale: keyof typeof locales) {
  console.log(locale);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { messages } = await import(`./locales/${locale}.po`);

  console.log(messages);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  i18n.load(locale, messages);
  i18n.activate(locale);
}

type LocaleSwitchValue = {
  activate: (locale: keyof typeof locales) => void;
  locale: keyof typeof locales;
};

export const LocaleSwitchContext = createContext<LocaleSwitchValue | null>(null);

export const LocalizationProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [currentLocale, setCurrentLocale] = useState<keyof typeof locales>(defaultLocale);

  useEffect(() => {
    void dynamicActivate(defaultLocale);
  }, []);

  const changeLocale = (locale: keyof typeof locales) => {
    setCurrentLocale(locale);
    dynamicActivate(locale);
  };

  return (
    <I18nProvider i18n={i18n}>
      <LocaleSwitchContext.Provider value={{ activate: changeLocale, locale: currentLocale }}>
        {children}
      </LocaleSwitchContext.Provider>
    </I18nProvider>
  );
};
