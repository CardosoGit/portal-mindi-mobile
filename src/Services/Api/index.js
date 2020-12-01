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
