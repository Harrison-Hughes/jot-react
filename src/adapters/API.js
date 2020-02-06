import { API_ROOT, HEADERS, HEADERS_AUTH } from "../constants/index";

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

const newProject = (user_code, name, description, open, default_access) =>
  fetch(`${API_ROOT}/newProject`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({
      project: {
        user_code: user_code,
        name: name,
        description: description,
        open: open,
        default_access: default_access
      }
    })
  })
    .then(jsonify)
    .catch(error => {
      console.error("Error:", error);
    });

const myProjects = userCode =>
  fetch(`${API_ROOT}/myProjects/${userCode}`, {
    method: "GET",
    headers: HEADERS_AUTH
  }).then(jsonify);

const getProject = projectCode =>
  fetch(`${API_ROOT}/projects/${projectCode}`, {
    method: "GET",
    headers: HEADERS_AUTH
  }).then(jsonify);

const newPad = (name, description, projectId) =>
  fetch(`${API_ROOT}/newPad`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({
      pad: {
        name: name,
        description: description,
        project_id: projectId
      }
    })
  }).catch(error => {
    console.error("Error:", error);
  });

const newPoint = (text, location, author_code, padId) =>
  fetch(`${API_ROOT}/newPoint`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({
      point: {
        text: text,
        location: location,
        author: author_code,
        pad_id: padId
      }
    })
  }).catch(error => {
    console.error("Error:", error);
  });

const getCollaborators = projectCode =>
  fetch(`${API_ROOT}/showCollaborators/${projectCode}`, {
    method: "GET",
    headers: HEADERS_AUTH
  }).then(jsonify);

const getPad = padCode =>
  fetch(`${API_ROOT}/pads/${padCode}`, {
    method: "GET",
    headers: HEADERS_AUTH
  }).then(jsonify);

const getCollaboration = (projectID, userID) =>
  fetch(`${API_ROOT}/getCollaboration/${userID}/${projectID}`, {
    method: "GET",
    headers: HEADERS_AUTH
  }).then(jsonify);

const deletePad = padID =>
  fetch(`${API_ROOT}/deletePad/${padID}`, {
    method: "DELETE",
    headers: HEADERS_AUTH
  });

const joinProjectIfOpen = (project_code, user_code, nickname) =>
  fetch(`${API_ROOT}/joinProjectIfOpen`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({
      collaboration: {
        project_code: project_code,
        user_code: user_code,
        nickname: nickname
      }
    })
  });

const sendInvitation = (userCode, projectCode) =>
  fetch(`${API_ROOT}/sendInvitation`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({
      collaboration: {
        user_code: userCode,
        project_code: projectCode
      }
    })
  });

const acceptInvitation = (invitationId, nickname) =>
  fetch(`${API_ROOT}/acceptInvitation`, {
    method: "POST",
    headers: HEADERS_AUTH,
    body: JSON.stringify({
      collaboration: {
        invitation_id: invitationId,
        nickname: nickname
      }
    })
  });

const myInvitations = userCode =>
  fetch(`${API_ROOT}/myInvitations/${userCode}`, {
    method: "GET",
    headers: HEADERS_AUTH
  }).then(jsonify);

export default {
  signin,
  signup,
  validate,
  newProject,
  myProjects,
  getProject,
  newPad,
  getCollaborators,
  newPoint,
  getPad,
  getCollaboration,
  deletePad,
  joinProjectIfOpen,
  sendInvitation,
  acceptInvitation,
  myInvitations,
  hasToken: !!localStorage.token,
  clearToken: () => localStorage.removeItem("token")
};
