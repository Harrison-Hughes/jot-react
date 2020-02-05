import React from "react";
import DocumentOverview from "./document container/DocumentOverview";
import NewDocumentButton from "./document container/NewDocumentButton";

const DocumentContainer = props => {
  const renderPads = () => {
    if (!!props.pads) {
      return props.pads.map((pad, i) => {
        return <DocumentOverview key={i} pad={pad} />;
      });
    }
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
          selected project details / project log
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
