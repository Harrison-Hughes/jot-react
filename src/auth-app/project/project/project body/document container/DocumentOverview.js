import React from "react";
import Collapse from "@kunukn/react-collapse";
import "../../Accordion.css";
import SelectedDocumentPanel from "../SelectedDocumentPanel";

const DocumentOverview = props => {
  return (
    <div className="pad-panel">
      <div className="pad-panel-left">
        {props.someFormPresent ? (
          <div className={"document-overview-static element"}>
            <h3
              className={
                props.isSelectedDocument
                  ? "document-overview-static element selected"
                  : "document-overview-static element"
              }
            >
              {props.pad.name}
            </h3>
          </div>
        ) : (
          <div
            onClick={() => props.setDocument(props.pad)}
            className={
              props.isSelectedDocument
                ? "document-overview element selected"
                : "document-overview element"
            }
          >
            <h3 className="document-overview-h3">{props.pad.name}</h3>
          </div>
        )}
        <Collapse isOpen={props.isSelectedDocument}>
          <SelectedDocumentPanel
            project={props.project}
            access={props.access}
            document={props.document}
            nickname={props.nickname}
            refetch={() => props.refetch()}
            updatePad={newDetails => props.editPad(newDetails)}
          />
        </Collapse>
      </div>
    </div>
  );
};

export default DocumentOverview;
