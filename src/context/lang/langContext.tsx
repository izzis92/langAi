import React, { Dispatch, SetStateAction, createContext } from 'react';
import { LangMap } from '../../../helpers/constants';

export type LangKey = keyof typeof LangMap;
export type LangContextType = {
  lang: LangKey;
  setLang: Dispatch<SetStateAction<LangKey>>;
};

export const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [lang, setLang] = React.useState<LangKey>('en');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};
