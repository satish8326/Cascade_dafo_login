import axios from "axios"; // update the axios with the specific instance of axios interface service layer
import { cascadeDafoNowURLs } from "../../url/config";

export const GetPractitionersDropdownList = async (contactParams: any) => {
  console.log("here");
  const url = `${cascadeDafoNowURLs().contactsList}`;
  const response = await axios.get(url);
  return response;
};
