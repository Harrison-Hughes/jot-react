import React from "react";
import { withRouter } from "react-router-dom";
import { API_WS_ROOT } from "../../constants/index";
import { ActionCableProvider } from "react-actioncable-provider";
import PadHeader from "./pad/PadHeader";
import PadBody from "./pad/PadBody";

const Pad = ({ props, match }) => {
  const { params } = match;
  console.log(props.user);

  return (
    <div className="pad">
      <PadHeader />
      <ActionCableProvider url={API_WS_ROOT}>
        <PadBody padId={params.padCode} />
      </ActionCableProvider>
    </div>
  );
};

export default withRouter(Pad);
