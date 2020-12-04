import React, { useMemo } from "react";

import Avatar from "@material-ui/core/Avatar";
import Box, { BoxProps } from "@material-ui/core/Box";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

import { formatAddress } from "../../helpers/address.helper";
import SiteData from "../../data-types/site-data";

export interface SiteSummaryProps {
  data: SiteData;
  dark?: boolean;
}

const SiteSummary: React.FC<SiteSummaryProps> = ({ data, dark = false }) => {
  const [boxColor, secondaryTextColor] = useMemo<
    [BoxProps["color"], TypographyProps["color"]]
  >(() => (dark ? ["white", undefined] : [undefined, "textSecondary"]), [dark]);

  return (
    <Box
      alignItems="center"
      className="SiteSummary"
      display="flex"
      flexDirection="row"
      minWidth={0}
    >
      <Avatar alt={`${data.title} avatar`} src={data.images[0]} />

      <Box color={boxColor} flex={1} minWidth={0} ml={2} role="text-box">
        <Typography>{data.title}</Typography>
        <Typography
          color={secondaryTextColor}
          noWrap={true}
          title={formatAddress(data.address)}
          variant="body2"
        >
          {formatAddress(data.address)}
        </Typography>
        <Typography color={secondaryTextColor} variant="body2">
          {data.contact.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default SiteSummary;
