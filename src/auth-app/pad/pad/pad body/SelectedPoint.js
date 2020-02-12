import React, { useState, useEffect } from "react";
import Button from "../../../../elements/Button";
import API from "../../../../adapters/API";

const SelectedPoint = ({
  selectedPoint,
  access,
  userCode,
  clearSelectedPoint
}) => {
  const [editMode, setEditMode] = useState(false);

  const deletePoint = () => {
    clearSelectedPoint();
    API.deletePoint(selectedPoint.id);
  };

  const updatePoint = newText => {
    API.editPoint(selectedPoint.id, newText);
    setEditMode(false);
  };

  if (!!selectedPoint) {
    if (access === "admin" || userCode === selectedPoint.author)
      return (
        <OwnerOrAdmin
          deletePoint={() => deletePoint()}
          selectedPoint={selectedPoint}
          editMode={editMode}
          enterEditMode={() => setEditMode(true)}
          leaveEditMode={() => setEditMode(false)}
          updatePoint={newText => updatePoint(newText)}
        />
      );
    else return <CasualViewer selectedPoint={selectedPoint} />;
  } else return <></>;
};

const OwnerOrAdmin = ({
  selectedPoint,
  deletePoint,
  editMode,
  enterEditMode,
  leaveEditMode,
  updatePoint
}) => {
  const [pointText, setPointText] = useState(selectedPoint.text);

  useEffect(() => setPointText(selectedPoint.text), [selectedPoint]);

  const handleTextChange = e => {
    setPointText(e.target.value);
  };

  if (!editMode) {
    return (
      <div className="selected-point-container">
        <div className="selected-point-left">
          <p>{selectedPoint.text}</p>
        </div>
        <div className="selected-point-right">
          <div className="selected-point-right-upper">
            <p className="center">author: {selectedPoint.author}</p>
          </div>
          <div className="selected-point-right-lower">
            <Button positive onClick={() => enterEditMode()} thin>
              edit
            </Button>
            <Button positive thin>
              move
            </Button>
            <Button onClick={() => deletePoint()} negative thin>
              delete
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="selected-point-container">
        <div className="selected-point-left">
          <textarea
            className="new-point-textarea-input"
            onChange={handleTextChange}
            rows="3"
            cols="30"
            name="text"
            placeholder="point text"
            value={pointText}
          />
        </div>
        <div className="selected-point-right">
          <div className="selected-point-right-upper">
            <p className="center">author: {selectedPoint.author}</p>
          </div>
          <div className="selected-point-right-lower">
            <Button positive onClick={() => updatePoint(pointText)} thin>
              update
            </Button>
            <Button onClick={() => leaveEditMode()} negative thin>
              cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
};

const CasualViewer = ({ selectedPoint }) => {
  return (
    <div className="selected-point-container">
      <div className="selected-point-left">
        <p>{selectedPoint.text}</p>
      </div>
      <div className="selected-point-right">
        <p className="center">author: {selectedPoint.author}</p>
      </div>
    </div>
  );
};

export default SelectedPoint;
