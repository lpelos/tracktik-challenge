import React from "react";

import Box from "@material-ui/core/Box";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import SiteData from "../../data-types/site-data";
import SiteSummary from "../SiteSummary";

export interface SiteListProps {
  data: SiteData[];
  onClickItem: (siteId: SiteData["id"]) => void;
}

const SiteList: React.FC<SiteListProps> = ({ data, onClickItem }) => {
  return (
    <div className="SiteList">
      <List component="nav">
        {data.map((site, i) => (
          <React.Fragment key={site.id}>
            {i > 0 ? <Divider /> : null}

            <ListItem button onClick={() => onClickItem(site.id)}>
              <Box flex={1} minWidth={0}>
                <SiteSummary data={site} />
              </Box>
              <ChevronRight />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default SiteList;
