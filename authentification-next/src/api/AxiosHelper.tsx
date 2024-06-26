import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; //to allow cookies

export const request = (
  method: any,
  url: string,
  data?: any,
  header?: any
) => {
  return axios({
    method: method,
    url: url,
    data: data,
    headers: header
  });
};
