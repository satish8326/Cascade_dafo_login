import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { getAccount } from '../auth/acquireToken';
import { msalInstance,  } from '../auth/msalInstance';
import type { AccountInfo, RedirectRequest } from '@azure/msal-browser';

export interface User {
  name: string;
  organization: string;
  email?: string;
  account?: AccountInfo;
}

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginRedirect: (email?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Production-ready AuthProvider with MSAL integration
 * Handles authentication state, user session, and MSAL redirect flow
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async (): Promise<void> => {
      try {
        // First check if we're returning from a redirect
        const redirectResponse = await msalInstance.handleRedirectPromise();

        if (redirectResponse?.account) {
          const userData: User = {
            name: redirectResponse.account.name || redirectResponse.account.username || 'User',
            organization: 'Organization',
            email: redirectResponse.account.username,
            account: redirectResponse.account,
          };
          setUser(userData);
          setIsLoading(false);
          return;
        }

        // If no redirect response, check for existing account
        const account = getAccount();
        if (account) {
          const userData: User = {
            name: account.name || account.username || 'User',
            organization: 'Organization',
            email: account.username,
            account,
          };
          setUser(userData);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      } catch (error) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.error('Auth initialization error:', error);
        }
        setIsLoading(false);
      }
    };

    void initializeAuth();
  }, []);

  /**
   * MSAL login redirect
   * Uses full-page redirect to Microsoft login.
   */
   const getLoginRequest = (email?: string): RedirectRequest => ({
    scopes: [],
    prompt: "login",
    ...(email && { loginHint: email, extraQueryParameters: { hsu: '1'} }),
  });
  const loginRedirect = useCallback(async (email?: string): Promise<void> => {
    try {
      let loginRequest = getLoginRequest(email);
      await msalInstance.loginRedirect(loginRequest);
    } catch (error) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.error('Login redirect error:', error);
      }
      throw error;
    }
  }, []);

  /**
   * Logout user and clear MSAL cache
   */
  const logout = useCallback(async () => {
      const account = getAccount();
      if (!account) return;
  
      await msalInstance.logoutRedirect({
        account,
        postLogoutRedirectUri: "/login",
      });
    },
    [msalInstance, getAccount]
  );
  

  const value: AuthContextValue = {
    user,
    isAuthenticated: Boolean(user || getAccount()),
    isLoading,
    logout,
    loginRedirect,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
