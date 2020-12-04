import React from "react";

import Box from "@material-ui/core/Box";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import Slider from "react-slick";

import ContactDetails from "../ContactDetails";
import SiteData from "../../data-types/site-data";
import SiteSummary from "../SiteSummary";

export interface SiteDetailsProps {
  data: SiteData;
  onBackButtonClick: () => void;
}

const SiteDetails: React.FC<SiteDetailsProps> = ({
  data,
  onBackButtonClick,
}) => {
  return (
    <div className="SiteDetails">
      <Box
        bgcolor="primary.main"
        color="white"
        component="header"
        display="flex"
        flexDirection="row"
        p={2}
        role="header"
      >
        <IconButton color="inherit" title="Go back" onClick={onBackButtonClick}>
          <ChevronLeft />
        </IconButton>

        <SiteSummary dark={true} data={data} />
      </Box>

      <Slider infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
        {data.images.map((src, i) => (
          <img alt={`${data.title} ${i + 1}`} key={i} src={src} />
        ))}
      </Slider>

      <ContactDetails data={data.contact} />
    </div>
  );
};

export default SiteDetails;
