import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import AppToolbarContainer from "../../containers/AppToolbarContainer";
import SiteDetailsScreen from "../../screens/SiteDetailsScreen";
import SiteListScreen from "../../screens/SiteListScreen";

const AppNavigation: React.FC = () => {
  return (
    <div className="AppNavigation">
      <AppToolbarContainer />

      <Switch>
        <Route path="/sites/:id">
          <SiteDetailsScreen />
        </Route>

        <Route path="/sites">
          <SiteListScreen />
        </Route>

        <Route path="/">
          <Redirect to="/sites" />
        </Route>
      </Switch>
    </div>
  );
};

export default AppNavigation;
