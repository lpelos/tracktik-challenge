import React from "react";

import { Link as RouterLink } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Slider from "react-slick";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import Typography from "@material-ui/core/Typography";

import "./SiteDetails.scss";
import ContactDetails from "../ContactDetails";
import SiteData from "../../data-types/site-data";
import SiteSummary from "../SiteSummary";

export interface SiteDetailsProps {
  data?: SiteData;
  hasError?: boolean;
  isLoading?: boolean;
  onLinkClick?: (e: React.MouseEvent, ...args: any[]) => void;
  onLoad: () => void;
}

const SiteDetails: React.FC<SiteDetailsProps> = ({
  data,
  hasError = false,
  isLoading = false,
  onLinkClick,
  onLoad,
}) => {
  return (
    <div className="SiteDetails">
      {isLoading ? (
        <Box p={3} textAlign="center">
          <CircularProgress aria-label="loading..." role="spinner" />
        </Box>
      ) : hasError ? (
        <Box p={3} textAlign="center">
          <Typography color="error" paragraph={true}>
            Oops. Something went wrong.
          </Typography>

          <Button onClick={onLoad}>Try Again</Button>

          <Typography>
            <RouterLink
              component={({ href }) => (
                <Button href={href} color="primary" onClick={onLinkClick}>
                  Go back to the list
                </Button>
              )}
              to="/sites"
            />
          </Typography>
        </Box>
      ) : data ? (
        <>
          <AppBar position="static">
            <Toolbar>
              <RouterLink
                component={({ href }) => (
                  <IconButton
                    href={href}
                    color="inherit"
                    component="a"
                    title="Go back"
                    onClick={onLinkClick}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
                to="/sites"
              />

              <SiteSummary dark={true} data={data} />
            </Toolbar>
          </AppBar>

          <main>
            <Slider
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {data.images.map((src, i) => (
                <img alt={`${data.title} ${i + 1}`} key={i} src={src} />
              ))}
            </Slider>

            <ContactDetails data={data.contact} />
          </main>
        </>
      ) : null}
    </div>
  );
};

export default SiteDetails;
