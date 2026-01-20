import {
  existingOrNewSignUpModel,
  signUpModel,
} from "../../../components/SignUp/model";
import { cascadeDafoNowURLs } from "../../url/config";
import { post } from "../../apiService";

export const ValidateCustomer = async (model: signUpModel) : Promise<any> =>  {
  const url = `${cascadeDafoNowURLs().login.validateCustomer}`;
  const response = await post(url, model);
  return response;
};

export const ExistingUserSignUp = async (model: existingOrNewSignUpModel) : Promise<any> => {
  const url = `${cascadeDafoNowURLs().login.existingSignUp}`;
  const response = await post(url, model);
  return response;
};

export const NewUserSignUp = async (model: existingOrNewSignUpModel) : Promise<any> => {
  const url = `${cascadeDafoNowURLs().login.newSignUp}`;
  const response = await post(url, model);
  return response;
};
