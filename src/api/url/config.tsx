export const cascadeDafoNowURLs = () => {
  return {
    login: {
        validateLoginEmail: "Auth/validate-login-email",
        validateCustomer: "Auth/validate-customer", // domain to be removed from here and be used from env
        getContactsByCustomer: "Auth/get-contacts-by-customerId",
        existingSignUp: "Auth/existing-signup",
        newSignUp: "Auth/new-signup",
        newAccountRequestSignup: "Auth/new-request-signup",
      }
  };
};
