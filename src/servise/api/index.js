import axios from "axios";

const myAxios = axios.create({
  baseURL: "https://apforrg1.herokuapp.com/api",
});
myAxios.interceptors.request.use((req) => {
  let token = localStorage.getItem("TOKEN");
  if (token) {
    req.headers.authorization = token;
  }
  return req;
});

export default myAxios;
