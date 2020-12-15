import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getToken = () => {
  const token = localStorage.getItem("token") || "";
  return `Bearer ${token} `;
};

export const api = axios.create({
  baseURL: API_URL,
  headers: { authorization: getToken() },
});

api.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise
    if (error.response.status === 401) {
      window.location.href = "/#/login";
    }
    return Promise.reject(error);
  }
);
