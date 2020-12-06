import React from "react";

import { Link as RouterLink } from "react-router-dom";
import Box from "@material-ui/core/Box";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import Slider from "react-slick";

import ContactDetails from "../ContactDetails";
import SiteData from "../../data-types/site-data";
import SiteSummary from "../SiteSummary";

export interface SiteDetailsProps {
  data?: SiteData;
  isLoading?: boolean;
  onLinkClick?: (e: React.MouseEvent, ...args: any[]) => void;
}

const SiteDetails: React.FC<SiteDetailsProps> = ({
  data,
  isLoading = false,
  onLinkClick,
}) => {
  return (
    <div className="SiteDetails">
      {isLoading ? (
        <Box p={3} textAlign="center">
          <CircularProgress aria-label="loading..." role="spinner" />
        </Box>
      ) : data ? (
        <>
          <Box
            bgcolor="primary.main"
            color="white"
            component="header"
            display="flex"
            flexDirection="row"
            p={2}
            role="header"
          >
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
          </Box>

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
        </>
      ) : null}
    </div>
  );
};

export default SiteDetails;
