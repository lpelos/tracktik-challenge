import React from "react";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import SITE_DATA_LIST from "../../__fixtures__/site-data-list.fixture";
import SiteList, { SiteListProps } from ".";

export default {
  title: "SiteList",
  component: SiteList,
  excludeStories: /.*Data$/,
} as Meta;

export const siteListData: Omit<SiteListProps, "onClickItem"> = {
  data: SITE_DATA_LIST,
};

export const siteListActionData: Pick<SiteListProps, "onClickItem"> = {
  onClickItem: action("onClickItem"),
};

const Template: Story<SiteListProps> = (args) => <SiteList {...args} />;

export const Default = Template.bind({});
Default.args = { ...siteListData, ...siteListActionData };
