import React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";

import SiteListContainer from "../containers/SiteListContainer";

interface RouteParams {}

type Props = RouteComponentProps<RouteParams>;

const SiteListScreen: React.FC<Props> = () => {
  return <SiteListContainer />;
};

export default withRouter(SiteListScreen);
