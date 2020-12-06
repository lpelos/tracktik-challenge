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

export const siteDetailsData: Omit<SiteDetailsProps, "onLinkClick"> = {
  data: SITE_DATA,
  isLoading: false,
};

export const siteDetailsActionData: Pick<SiteDetailsProps, "onLinkClick"> = {
  onLinkClick: (event, ...args) => {
    event.preventDefault();
    action("onLinkClick")(event, ...args);
  },
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
