import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://${import.meta.env.VITE_TENANT_NAME}.ciamlogin.com/`,
    knownAuthorities: [`${import.meta.env.VITE_TENANT_NAME}.ciamlogin.com`,],
    navigateToLoginRequestUrl: false,
    postLogoutRedirectUri: window.location.origin,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    allowPlatformBroker: false,
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        if (import.meta.env.DEV) {
          console.log(`[MSAL ${level}]`, message);
        }
      },
      logLevel: import.meta.env.DEV ? 2 : 0, // Info in dev, Error in prod
    },
  },
});


