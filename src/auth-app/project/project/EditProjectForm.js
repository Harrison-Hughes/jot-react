import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FadeInDiv from "../../../elements/FadeInDiv";
import API from "../../../adapters/API";
import "./EditProjectForm.css";
import Button from "../../../elements/Button";

const EditProjectForm = ({
  user,
  project,
  access,
  showEditForm,
  moreThanOneAdmin,
  quitForm
}) => {
  const hist = useHistory();
  const [moreAdminsNeededMsg, setMoreAdminsNeededMsg] = useState(false);

  const leaveProject = () => {
    API.leaveProject(user.id, project.id);
    hist.push(`/homescreen`);
  };

  const tryToLeaveProject = () => {
    if (moreThanOneAdmin()) leaveProject();
    else setMoreAdminsNeededMsg(true);
  };

  return (
    <div className="collaborator-list">
      <FadeInDiv
        className={showEditForm ? "fade-in-div on" : "fade-in-div off"}
      >
        {!!project && (
          <div>
            {access === "admin" && (
              <EditProjectFormAdmin
                tryToLeaveProject={() => tryToLeaveProject()}
                moreAdminsNeededMsg={moreAdminsNeededMsg}
                project={project}
              />
            )}
            {access === "editor" && (
              <EditProjectFormEditor
                leaveProject={() => leaveProject()}
                project={project}
              />
            )}
            {access === "read only" && (
              <EditProjectFormViewOnly
                leaveProject={() => leaveProject()}
                project={project}
              />
            )}
            <button onClick={() => quitForm()}>cancel</button>
          </div>
        )}
      </FadeInDiv>
    </div>
  );
};

const EditProjectFormAdmin = ({
  moreAdminsNeededMsg,
  project,
  tryToLeaveProject
}) => {
  const [formData, setFormData] = useState({
    name: project.name,
    description: project.description,
    open: project.open,
    defaultAccess: project.default_access
  });

  const handleNameChange = e => {
    if (formData.name.length <= 15) {
      setFormData({
        ...formData,
        name: e.target.value
      });
    }
  };

  const handleDescChange = e => {
    if (
      formData.description.length <= 80 &&
      formData.description.split(" ").lastIndexOf.length <= 20 &&
      e.target.keyCode !== 8
    ) {
      setFormData({
        ...formData,
        description: e.target.value
      });
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    API.updateProject(
      project.project_code,
      formData.name,
      formData.description,
      formData.defaultAccess,
      formData.open
    );
  };

  return (
    <div className="admin-project-options">
      <div className="edit-project-form">
        <h2>Update Project</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>project name:</label>
            <input
              onChange={handleNameChange}
              type="name"
              name="name"
              placeholder="name (max 15 chars.)"
              value={formData.name}
            />
          </div>
          <div className="form-field">
            <label>project description:</label>
            <textarea
              onChange={handleDescChange}
              name="description"
              placeholder="description (max 80 chars.)"
              value={formData.description}
            />
          </div>
          <div className="form-field">
            open:
            <input
              type="radio"
              value="open"
              checked={formData.open}
              onChange={() =>
                setFormData({
                  ...formData,
                  open: true
                })
              }
            />
            private:
            <input
              type="radio"
              value="private"
              checked={!formData.open}
              onChange={() =>
                setFormData({
                  ...formData,
                  open: false
                })
              }
            />
          </div>
          <div className="form-field">
            default access:
            <select
              value={formData.defaultAccess}
              onChange={e =>
                setFormData({
                  ...formData,
                  defaultAccess: e.target.value
                })
              }
            >
              <option value={"admin"}>admin</option>
              <option value={"editor"}>editor</option>
              <option value={"read only"}>read only</option>
            </select>
          </div>
          <input
            disabled={
              formData.name === "" ||
              formData.description === "" ||
              anyWordsInStringTooLong(formData.description)
            }
            type="submit"
            value="save changes"
          />
        </form>
      </div>
      <div className="delete-project">
        <Button negative thin onClick={() => console.log("delete project")}>
          delete project
        </Button>
        <Button negative thin onClick={() => tryToLeaveProject()}>
          leave project
        </Button>
        {moreAdminsNeededMsg && (
          <p>
            you cannot leave, as you are the only admin - promote another
            collaborator to admin, then try again
          </p>
        )}
      </div>
    </div>
  );
};

const EditProjectFormEditor = props => {
  const [leaveConfirm, setLeaveConfirm] = useState(false);

  return (
    <div className="delete-project">
      {leaveConfirm ? (
        <div className="confirm-leave-buttons">
          <h3>are you sure?</h3>
          <p>this cannot be undone</p>
          <Button negative thin onClick={() => props.leaveProject()}>
            leave
          </Button>
          <Button positive thin onClick={() => setLeaveConfirm(false)}>
            stay
          </Button>
        </div>
      ) : (
        <div className="leave-project-option">
          <h3>Project options:</h3>
          <Button negative thin onClick={() => setLeaveConfirm(true)}>
            leave project
          </Button>
        </div>
      )}
    </div>
  );
};

const EditProjectFormViewOnly = props => {
  const [leaveConfirm, setLeaveConfirm] = useState(false);

  return (
    <div className="delete-project">
      {leaveConfirm ? (
        <div className="confirm-leave-buttons">
          <h3>are you sure?</h3>
          <p>this cannot be undone</p>
          <Button negative thin onClick={() => props.leaveProject()}>
            leave
          </Button>
          <Button positive thin onClick={() => setLeaveConfirm(false)}>
            stay
          </Button>
        </div>
      ) : (
        <div className="leave-project-option">
          <h3>Project options:</h3>
          <Button negative thin onClick={() => setLeaveConfirm(true)}>
            leave project
          </Button>
        </div>
      )}
    </div>
  );
};

const anyWordsInStringTooLong = string => {
  let arr = string.split(" ");
  let longestLength = arr.sort(function(a, b) {
    return b.length - a.length;
  })[0].length;
  return longestLength >= 15 ? true : false;
};

export default EditProjectForm;
