import React, { useCallback, useEffect } from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import {
  selectSitesList,
  selectSitesListError,
  selectSitesListIsRequesting,
  sitesActions,
} from "../redux/sites";
import { RootState } from "../redux/store";
import SiteList, { SiteListProps } from "../components/SiteList";

const mapState = (state: RootState) => ({
  data: selectSitesList(state),
  error: selectSitesListError(state),
  isRequesing: selectSitesListIsRequesting(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  onRequest: () => dispatch(sitesActions.listRequest()),
});

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const SiteListContainer: React.FC<Props> = ({
  data,
  error,
  isRequesing,
  onRequest,
}) => {
  const handleClickItem = useCallback<SiteListProps["onClickItem"]>(() => {
    console.log("TODO: handle onClickItem");
  }, []);

  // Fetch list on init
  useEffect(() => {
    onRequest();
  }, [onRequest]);

  return <SiteList data={data} onClickItem={handleClickItem} />;
};

export default connector(SiteListContainer);
