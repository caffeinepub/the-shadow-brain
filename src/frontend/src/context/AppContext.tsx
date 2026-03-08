import { type ReactNode, createContext, useContext, useState } from "react";

interface AppContextValue {
  incognito: boolean;
  toggleIncognito: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [incognito, setIncognito] = useState(false);

  const toggleIncognito = () => setIncognito((prev) => !prev);

  return (
    <AppContext.Provider value={{ incognito, toggleIncognito }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
