import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";

import { formatAddress } from "../../helpers/address.helper";
import SiteData from "../../data-types/site-data";

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
              <ListItemAvatar>
                <Avatar alt={`${site.title} avatar`} src={site.images[0]} />
              </ListItemAvatar>

              <ListItemText
                primary={site.title}
                secondary={
                  <>
                    <Box
                      component="span"
                      display="block"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {formatAddress(site.address)}
                    </Box>
                    {site.contact.name}
                  </>
                }
                style={{ whiteSpace: "nowrap" }}
              />

              <ChevronRight />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export default SiteList;
