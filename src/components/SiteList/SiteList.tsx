import React from "react";

import { Link as RouterLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ChevronRight from "@material-ui/icons/ChevronRight";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

import "./SiteList.scss";
import SiteData from "../../data-types/site-data";
import SiteSummary from "../SiteSummary";
import { AppBar } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";

export interface SiteListProps {
  data: SiteData[];
  hasError?: boolean;
  hasMore?: boolean;
  isLoading?: boolean;
  onLinkClick?: (e: React.MouseEvent, ...args: any[]) => void;
  onLoad: () => void;
}

const SiteList: React.FC<SiteListProps> = ({
  data,
  hasError = false,
  hasMore = false,
  isLoading = false,
  onLinkClick,
  onLoad,
}) => {
  return (
    <Box className="SiteList" pb={3}>
      <AppBar elevation={0} position="fixed">
        <Toolbar variant="dense">
          <Box flex={1}>
            <Typography align="center" variant="subtitle1">
              Sites
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <List component="nav">
        {data.map((site, i) => (
          <React.Fragment key={site.id}>
            {i > 0 ? <Divider /> : null}

            <RouterLink
              component={({ href }) => (
                <ListItem
                  component="a"
                  href={href}
                  onClick={(e: React.MouseEvent) =>
                    onLinkClick && onLinkClick(e, site.id)
                  }
                >
                  <Box color="text.primary" flex={1} minWidth={0}>
                    <SiteSummary data={site} />
                  </Box>

                  <Box color="text.primary">
                    <ChevronRight />
                  </Box>
                </ListItem>
              )}
              to={`/sites/${site.id}`}
            />
          </React.Fragment>
        ))}
      </List>

      <Box p={3} textAlign="center">
        {isLoading ? (
          <CircularProgress aria-label="loading..." role="spinner" />
        ) : hasError ? (
          <>
            <Typography color="error" paragraph={true} variant="body2">
              An unexpected error has occurred.
            </Typography>
            <Button color="default" onClick={onLoad}>
              Try again
            </Button>
          </>
        ) : hasMore ? (
          <Button color="primary" onClick={onLoad}>
            Load More
          </Button>
        ) : data.length === 0 ? (
          <Typography color="textSecondary" variant="body2">
            There are no sites to be found...
          </Typography>
        ) : (
          <Typography color="textSecondary" variant="body2">
            you reached the end of the list
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SiteList;
