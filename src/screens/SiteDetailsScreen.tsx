import React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import SiteDetailsContainer from "../containers/SiteDetailsContainer";

interface RouteParams {
  id: string;
}

type Props = RouteComponentProps<RouteParams>;

const SiteListScreen: React.FC<Props> = ({ match }) => {
  const { id } = match.params;

  return <SiteDetailsContainer id={id} />;
};

export default withRouter(SiteListScreen);
