const API_URL = process.env.REACT_APP_API_URL + "/graphql";

const getToken = () => {
  const token = localStorage.getItem("token") || "";
  return `Bearer ${token} `;
};

export function fetchOptionsOverride(options: any) {
  options.url = API_URL;
  options.headers.Authorization = getToken();
}
