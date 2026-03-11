import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_AUTH_KEY = "tsb_auth";

interface AppContextValue {
  incognito: boolean;
  toggleIncognito: () => void;
  isLocallyLoggedIn: boolean;
  localLogin: (username: string, password: string) => boolean;
  localLogout: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [incognito, setIncognito] = useState(false);
  const [isLocallyLoggedIn, setIsLocallyLoggedIn] = useState(() => {
    return localStorage.getItem(LOCAL_AUTH_KEY) === "1";
  });

  useEffect(() => {
    if (isLocallyLoggedIn) {
      localStorage.setItem(LOCAL_AUTH_KEY, "1");
    } else {
      localStorage.removeItem(LOCAL_AUTH_KEY);
    }
  }, [isLocallyLoggedIn]);

  const toggleIncognito = () => setIncognito((prev) => !prev);

  const localLogin = (username: string, password: string): boolean => {
    if (username === "TheShadowBrain2026" && password === "Make.It.Happen") {
      setIsLocallyLoggedIn(true);
      return true;
    }
    return false;
  };

  const localLogout = () => setIsLocallyLoggedIn(false);

  return (
    <AppContext.Provider
      value={{
        incognito,
        toggleIncognito,
        isLocallyLoggedIn,
        localLogin,
        localLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
}
