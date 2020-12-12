import React, { useEffect } from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../redux/store";
import {
  selectUserData,
  selectUserIsRequesting,
  userActions,
} from "../redux/user";
import AppToolbar from "../components/AppToolbar/AppToolbar";

const mapState = (state: RootState) => ({
  isLoadingUser: selectUserIsRequesting(state),
  user: selectUserData(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  onRequest: () => dispatch(userActions.getCurrentRequest()),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const AppToolbarContainer: React.FC<Props> = ({
  isLoadingUser,
  user,
  onRequest,
}) => {
  // Fetch list on init
  useEffect(() => {
    onRequest();
  }, [onRequest]);

  return <AppToolbar isLoadingUser={isLoadingUser} user={user} />;
};

export default connector(AppToolbarContainer);
