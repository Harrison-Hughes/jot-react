import React, { useState } from "react";
import DocumentOverview from "./document container/DocumentOverview";
import NewDocumentButton from "./document container/NewDocumentButton";
import SelectedDocumentPanel from "./SelectedDocumentPanel";

const DocumentContainer = props => {
  const [selectedDocument, setSelectedDocument] = useState(null);

  const renderPads = () => {
    if (!!props.pads) {
      return props.pads.map((pad, i) => {
        return (
          <DocumentOverview
            isSelectedDocument={isSelectedDocument(pad, selectedDocument)}
            setDocument={pad => setSelectedDocument(pad)}
            key={i}
            pad={pad}
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
        <div className="document-display-header-left"></div>
        <div className="document-display-header-centre">
          <h3 className="sub">documents</h3>
        </div>
        <div className="document-display-header-right">
          <NewDocumentButton
            on={props.showNewDocumentForm}
            toggleNewDoc={() => props.toggleNewDoc()}
          />
        </div>
      </div>
      <div
        className={
          props.someFormPresent
            ? "document-display-body blur"
            : "document-display-body"
        }
      >
        <div className="document-display-body-left">
          <SelectedDocumentPanel document={selectedDocument} />
        </div>
        <div className="document-display-body-right">
          <div className="scroll-container y-scroll y-proximity">
            <div className="wrapper">{renderPads()}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentContainer;
