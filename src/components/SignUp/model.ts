export interface signUpModel {
  accountId?: string;
  billingZipCode?: string;
}

export interface existingOrNewSignUpModel {
  contactId?: string;
  customerId?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  mobilePhone?: string;
  name?: string;
}

export const screens = {
  signUp: "sign-up",
  searchContact: "search-contact",
  addNewContact: "add-new-contact",
  existingContactConfirmation: "existing-confirmation",
  newContactConfirmation: "new-confirmation",
  newAccountRequest: "new-account-request",
};
