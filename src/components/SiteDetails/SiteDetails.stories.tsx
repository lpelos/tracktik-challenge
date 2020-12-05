import React from "react";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import SITE_DATA from "../../__fixtures__/site-data.fixture";
import SiteDetails, { SiteDetailsProps } from ".";

export default {
  title: "SiteDetails",
  component: SiteDetails,
  excludeStories: /.*Data$/,
} as Meta;

export const siteDetailsData: Omit<SiteDetailsProps, "onBackButtonClick"> = {
  data: SITE_DATA,
};

export const siteDetailsActionData: Pick<
  SiteDetailsProps,
  "onBackButtonClick"
> = {
  onBackButtonClick: action("onBackButtonClick"),
};

const Template: Story<SiteDetailsProps> = (args) => <SiteDetails {...args} />;

export const Default = Template.bind({});
Default.args = { ...siteDetailsData, ...siteDetailsActionData };
