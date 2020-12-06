import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "./App.scss";
import AppNavigation from "../AppNavigation";

const App: React.FC = () => {
  return (
    <div className="App">
      <AppBar elevation={0} position="fixed">
        <Toolbar variant="dense">
          <Box flex={1}>
            <Typography align="center" variant="subtitle1">
              Scheduling
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <AppNavigation />
    </div>
  );
};

export default App;
