export const API_ROOT = 'http://localhost:3000';
export const API_WS_ROOT = 'ws://localhost:3000/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
};
export const HEADERS_AUTH = {
  'Content-Type': 'application/json',
  Authorisation: localStorage.token
}