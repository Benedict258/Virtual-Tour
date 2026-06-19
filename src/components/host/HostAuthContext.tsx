import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { HostData } from '../../lib/api';

interface HostAuthState {
  passcode: string | null;
  host: HostData | null;
  isAuthenticated: boolean;
  login: (email: string, passcode: string) => Promise<boolean>;
  logout: () => void;
}

const HostAuthContext = createContext<HostAuthState>({
  passcode: null,
  host: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export function HostAuthProvider({ children }: { children: ReactNode }) {
  const [passcode, setPasscode] = useState<string | null>(() => {
    return sessionStorage.getItem('host_passcode');
  });

  const [host, setHost] = useState<HostData | null>(() => {
    const stored = sessionStorage.getItem('host_data');
    return stored ? JSON.parse(stored) : null;
  });

  const login = useCallback(async (email: string, p: string): Promise<boolean> => {
    try {
      const { hostLogin } = await import('../../lib/api');
      const result = await hostLogin(email, p);
      sessionStorage.setItem('host_passcode', p);
      sessionStorage.setItem('host_data', JSON.stringify(result.data));
      setPasscode(p);
      setHost(result.data);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem('host_passcode');
    sessionStorage.removeItem('host_data');
    setPasscode(null);
    setHost(null);
  }, []);

  return (
    <HostAuthContext.Provider value={{ passcode, host, isAuthenticated: !!passcode && !!host, login, logout }}>
      {children}
    </HostAuthContext.Provider>
  );
}

export function useHostAuth() {
  return useContext(HostAuthContext);
}
