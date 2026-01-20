import { cascadeDafoNowURLs } from "../../url/config";
import { get } from "../../apiService";

export const GetContactsByCustomer = async (contactParams: {
  customerId?: string;
  searchName?: string;
  pageNumber?: number;
  pageSize?: number;
}) => {
  const url = `${cascadeDafoNowURLs().login.getContactsByCustomer}`;
  const response = await get(url, contactParams);
  return response;
};
