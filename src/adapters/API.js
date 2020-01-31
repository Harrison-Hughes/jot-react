import {API_ROOT, HEADERS, HEADERS_AUTH} from '../constants/index'

const jsonify = resp => {
  if (resp.ok) {
    return resp.json();
  } else {
    throw resp.json();
  }
};

const handleUserResponse = user => {
  if (user.token) {
    localStorage.token = user.token;
  }
  return user;
};

const signin = user =>
  fetch(`${API_ROOT}/signin`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ user })
  })
  .then(jsonify)
  .then(handleUserResponse);


const signup = user =>
  fetch(`${API_ROOT}/signup`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ user })
  })
  .then(jsonify)
  .then(handleUserResponse);

const validate = () =>
  fetch(`${API_ROOT}/validate`, {
    method: "GET",
    headers: HEADERS_AUTH
  })
  .then(jsonify)
  .then(handleUserResponse);

const newProject = (name, description, open) => 
  fetch(`${API_ROOT}/newProject`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({"project": { 
      "name": name,
      "description": description,
      "open": open
  }})
  })
  .then(jsonify)

const myProjects = () => 
  fetch(`${API_ROOT}/myProjects`, {
    method: "GET",
    headers: HEADERS_AUTH
  })
  .then(jsonify)

  export default {
    signin,
    signup,
    validate,
    newProject,
    myProjects,
    hasToken: !!localStorage.token,
    clearToken: () => localStorage.removeItem("token")
  };
