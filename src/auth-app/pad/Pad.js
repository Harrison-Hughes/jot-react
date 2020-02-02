import React from "react";
import { withRouter } from "react-router-dom";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider } from "react-actioncable-provider";
import PadHeader from "./pad/PadHeader";
import PadBody from "./pad/PadBody";

const Pad = ({ user, location, match }) => {
  const { params } = match;
  return (
    <div>
      {location.valid ? (
        <div className="pad">
          <PadHeader />
          <ActionCableProvider url={API_WS_ROOT}>
            <PadBody user={user} padCode={params.padCode} />
          </ActionCableProvider>
        </div>
      ) : (
        "you do not have access to this document"
      )}
    </div>
  );
};

export default withRouter(Pad);
