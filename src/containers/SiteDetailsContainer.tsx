import React, { useCallback, useEffect } from "react";

import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

import { RootState } from "../redux/store";
import {
  selectSiteData,
  selectSiteError,
  selectSiteIsRequesting,
  siteActions,
} from "../redux/site";
import SiteDetails, { SiteDetailsProps } from "../components/SiteDetails";
import SiteData from "../data-types/site-data";

const mapState = (state: RootState) => ({
  data: selectSiteData(state),
  error: selectSiteError(state),
  isLoading: selectSiteIsRequesting(state),
});

const mapDispatch = (dispatch: Dispatch) => ({
  onRequest: (id: SiteData["id"]) => dispatch(siteActions.findRequest(id)),
});

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  id: SiteData["id"];
}

const SiteDetailsContainer: React.FC<Props> = ({
  data,
  error,
  id,
  isLoading,
  onRequest,
}) => {
  const handleLoad = useCallback<SiteDetailsProps["onLoad"]>(() => {
    onRequest(id);
  }, [id, onRequest]);

  // Fetch item on init
  useEffect(handleLoad, [handleLoad]);

  return (
    <SiteDetails
      data={data}
      hasError={!!error}
      isLoading={isLoading}
      onLoad={handleLoad}
    />
  );
};

export default connector(SiteDetailsContainer);
