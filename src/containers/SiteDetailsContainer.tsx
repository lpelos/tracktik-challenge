import React from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../redux/store";
import SiteDetails from "../components/SiteDetails";
import SiteData from "../data-types/site-data";

const mapState = (state: RootState) => ({});

const mapDispatch = (dispatch: Dispatch) => ({});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  id: SiteData["id"];
}

const SiteDetailsContainer: React.FC<Props> = ({ id }) => {
  // TODO: fetch site from ID.

  return <SiteDetails isLoading={true} />;
};

export default connector(SiteDetailsContainer);
