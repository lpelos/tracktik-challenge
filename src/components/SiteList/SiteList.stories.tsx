import React from "react";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import { StaticRouter } from "react-router-dom";

import SITE_DATA_LIST from "../../__fixtures__/site-data-list.fixture";
import SiteList, { SiteListProps } from ".";

export default {
  title: "SiteList",
  component: SiteList,
  decorators: [(story) => <StaticRouter>{story()}</StaticRouter>],
  excludeStories: /.*Data$/,
} as Meta;

export const siteListData: Omit<SiteListProps, "onLinkClick" | "onLoad"> = {
  data: SITE_DATA_LIST,
  hasMore: true,
  hasError: false,
  isLoading: false,
};

export const siteListActionData: Pick<
  SiteListProps,
  "onLinkClick" | "onLoad"
> = {
  onLinkClick: (event, ...args) => {
    event.preventDefault();
    action("onLinkClick")(event, ...args);
  },
  onLoad: action("onLoad"),
};

const Template: Story<SiteListProps> = (args) => <SiteList {...args} />;

export const Default = Template.bind({});
Default.args = { ...siteListData, ...siteListActionData };

export const Loading = Template.bind({});
Loading.args = { ...siteListData, ...siteListActionData, isLoading: true };

export const EndOfTheList = Template.bind({});
EndOfTheList.args = { ...siteListData, ...siteListActionData, hasMore: false };

export const Empty = Template.bind({});
Empty.args = {
  ...siteListData,
  ...siteListActionData,
  data: [],
  hasMore: false,
};

export const WithError = Template.bind({});
WithError.args = { ...siteListData, ...siteListActionData, hasError: true };
