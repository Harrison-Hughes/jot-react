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

  // console.log(userCode, selectedPoint);

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
          <PointText text={selectedPoint.text} />
        </div>
        <div className="selected-point-right">
          <div className="selected-point-right-upper">
            <p className="center">author: {selectedPoint.author}</p>
          </div>
          <div className="selected-point-right-lower">
            <Button positive onClick={() => enterEditMode()} thin>
              edit
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
          <div className="selected-point-left-centred">
            <textarea
              className="new-point-textarea-input"
              onChange={handleTextChange}
              rows="5"
              cols="65"
              name="text"
              placeholder="point text"
              value={pointText}
            />
          </div>
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
        <PointText text={selectedPoint.text} />
      </div>
      <div className="selected-point-right">
        <p className="centred">author: {selectedPoint.author}</p>
      </div>
    </div>
  );
};

const PointText = ({ text }) => {
  return (
    <div className="point-text">
      <p className="spec-p">{text}</p>
    </div>
  );
};

export default SelectedPoint;
