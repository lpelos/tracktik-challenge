import React from "react";

import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import "./AppToolbar.scss";
import UserData from "../../data-types/user-data";

export interface AppToolbarProps {
  isLoadingUser?: boolean;
  user?: UserData;
}

const AppToolbar: React.FC<AppToolbarProps> = ({
  isLoadingUser = false,
  user,
}) => {
  return (
    <AppBar className="AppToolbar" elevation={0} position="fixed">
      <Toolbar variant="dense">
        {/*
          Placeholder of the same size as the avatar so that the title keeps at
          the center of the toolbar at all times
        */}
        {isLoadingUser || user ? (
          <div className="avatar placeholder"></div>
        ) : null}

        <Box flex={1}>
          <Typography align="center" variant="subtitle1">
            Scheduling
          </Typography>
        </Box>

        {isLoadingUser ? (
          <CircularProgress
            aria-label="loading..."
            color="inherit"
            role="spinner"
            size={30}
          />
        ) : user ? (
          <Avatar
            alt={user.name}
            className="avatar"
            role="avatar"
            src={user.avatarUrl}
            title={user.name}
          />
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
