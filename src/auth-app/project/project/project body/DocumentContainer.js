import React, { useState } from "react";
import DocumentOverview from "./document container/DocumentOverview";
import NewDocumentOverview from "./document container/NewDocumentOverview";

const DocumentContainer = props => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const renderPads = () => {
    if (!!props.pads) {
      return props.pads.map((pad, i) => {
        return (
          <DocumentOverview
            isSelectedDocument={isSelectedDocument(pad, selectedDocument)}
            setDocument={pad => {
              pad === selectedDocument
                ? setSelectedDocument(null)
                : setSelectedDocument(pad);
            }}
            key={i}
            pad={pad}
            project={props.project}
            access={props.access}
            document={selectedDocument}
            nickname={props.nickname}
            refetch={() => props.refetch()}
            editPad={newDetails => props.editPad(newDetails)}
          />
        );
      });
    }
  };

  const isSelectedDocument = (document, selectedDocument) => {
    if (!!selectedDocument) {
      if (
        document.id === selectedDocument.id &&
        !!document.pad_code === !!selectedDocument.pad_code
      )
        return true;
      else return false;
    } else return false;
  };

  return (
    <>
      <div className="document-display-header">
        <div className="document-display-header-left">
          <h3 className="sub">PROJECT DOCUMENTS</h3>
        </div>
        <div className="document-display-header-centre"></div>
        <div className="document-display-header-right"></div>
      </div>
      <div
        className={
          props.someFormPresent
            ? "document-display-body blur"
            : "document-display-body"
        }
      >
        <div className="document-display-body-right y-scroll wrapper">
          {renderPads()}
          <NewDocumentOverview
            engageShowNewDocumentForm={() => props.engageShowNewDocumentForm()}
          />
        </div>
      </div>
    </>
  );
};

export default DocumentContainer;
