import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import SiteDetailsScreen from "../../screens/SiteDetailsScreen";
import SiteListScreen from "../../screens/SiteListScreen";

const AppNavigation: React.FC = () => {
  return (
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
  );
};

export default AppNavigation;
