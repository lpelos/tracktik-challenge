import React, { useCallback, useEffect } from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../redux/store";
import {
  selectSitesHasMore,
  selectSitesList,
  selectSitesListError,
  selectSitesListIsRequesting,
  sitesActions,
} from "../redux/sites";
import SiteList, { SiteListProps } from "../components/SiteList";

const mapState = (state: RootState) => ({
  data: selectSitesList(state),
  error: selectSitesListError(state),
  hasMore: selectSitesHasMore(state),
  isRequesing: selectSitesListIsRequesting(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  onRequest: () => dispatch(sitesActions.listRequest()),
  onRequestMore: () => dispatch(sitesActions.listRequestMore()),
});

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const SiteListContainer: React.FC<Props> = ({
  data,
  error,
  hasMore,
  isRequesing,
  onRequest,
  onRequestMore,
}) => {
  const handleClickItem = useCallback<SiteListProps["onClickItem"]>(() => {
    console.log("TODO: handle onClickItem");
  }, []);

  const handleLoad = useCallback<SiteListProps["onLoad"]>(() => {
    if (error && data.length === 0) {
      onRequest();
    } else {
      onRequestMore();
    }
  }, [data, error, onRequest, onRequestMore]);

  // Fetch list on init
  useEffect(() => {
    onRequest();
  }, [onRequest]);

  return (
    <SiteList
      data={data}
      hasError={!!error}
      hasMore={hasMore}
      isLoading={isRequesing}
      onClickItem={handleClickItem}
      onLoad={handleLoad}
    />
  );
};

export default connector(SiteListContainer);
