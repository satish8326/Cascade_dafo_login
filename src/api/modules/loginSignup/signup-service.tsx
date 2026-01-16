import axios from "axios"; // update later with axios instance 
import { signUpModel } from "../../../components/SignUp/model";
import { cascadeDafoNowURLs } from "../../url/config";

//
export const SignUpUser = async (model: signUpModel) => {
  console.log("here");
  const url = `${cascadeDafoNowURLs().signUp}`;
  const response = await axios.post(url, { params: model });
  return response;
};
