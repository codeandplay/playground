"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type AppContextType = {
  isDebugEnabled: boolean;
  setIsDebugEnabled: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
  const [isDebugEnabled, setIsDebugEnabled] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isDebugEnabled,
        setIsDebugEnabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppWrapper");
  }
  return context;
}
