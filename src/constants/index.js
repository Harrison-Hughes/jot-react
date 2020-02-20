// const BASE_URL = "jot-back-end.herokuapp.com";
const BASE_URL = "localhost:3000";
export const API_ROOT = `https://${BASE_URL}`;
export const API_WS_ROOT = `wss://${BASE_URL}/cable`;
export const HEADERS = {
  "Content-Type": "application/json"
};
export const HEADERS_AUTH = {
  "Content-Type": "application/json",
  Authorisation: localStorage.token
};
