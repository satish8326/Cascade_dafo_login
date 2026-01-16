import {
  InteractionRequiredAuthError,
  AccountInfo
} from "@azure/msal-browser";
import { msalInstance } from "./msalInstance";
const API_SCOPE = import.meta.env.VITE_API_SCOPE;

export async function acquireAccessToken(): Promise<string> {
  const accounts = msalInstance.getAllAccounts();
  if (!accounts.length) {
    throw new Error("User not authenticated");
  }

  const account: AccountInfo = accounts[0];

  try {
    const result = await msalInstance.acquireTokenSilent({
      scopes: [API_SCOPE],
      account,
    });

    return result.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      msalInstance.loginRedirect({
        scopes: [API_SCOPE],
        redirectUri: window.location.origin,
      });
    }
    throw error;
  }
}

export const getAccount = (): AccountInfo | null => {
  const accounts = msalInstance.getAllAccounts();
  return accounts.length > 0 ? accounts[0] : null as AccountInfo | null;
}
