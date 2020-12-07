import React from "react";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { StaticRouter } from "react-router-dom";

import SITE_DATA from "../../__fixtures__/site-data.fixture";
import SiteDetails, { SiteDetailsProps } from ".";

export default {
  title: "SiteDetails",
  component: SiteDetails,
  decorators: [(story) => <StaticRouter>{story()}</StaticRouter>],
  excludeStories: /.*Data$/,
} as Meta;

export const siteDetailsData: Omit<
  SiteDetailsProps,
  "onLinkClick" | "onLoad"
> = {
  data: SITE_DATA,
  hasError: false,
  isLoading: false,
};

export const siteDetailsActionData: Pick<
  SiteDetailsProps,
  "onLinkClick" | "onLoad"
> = {
  onLinkClick: (event, ...args) => {
    event.preventDefault();
    action("onLinkClick")(event, ...args);
  },
  onLoad: action("onLoad"),
};

const Template: Story<SiteDetailsProps> = (args) => <SiteDetails {...args} />;

export const Default = Template.bind({});
Default.args = { ...siteDetailsData, ...siteDetailsActionData };

export const Loading = Template.bind({});
Loading.args = {
  ...siteDetailsData,
  ...siteDetailsActionData,
  isLoading: true,
};

export const WithError = Template.bind({});
WithError.args = {
  ...siteDetailsData,
  ...siteDetailsActionData,
  hasError: true,
};
