import React from "react";

import { Meta, Story } from "@storybook/react";

import AppToolbar, { AppToolbarProps } from "./AppToolbar";
import USER_DATA from "../../__fixtures__/user-data.fixture";

export default {
  title: "AppToolbar",
  component: AppToolbar,
  excludeStories: /.*Data$/,
} as Meta;

export const appToolbarData: AppToolbarProps = {
  isLoadingUser: false,
  user: USER_DATA,
};

const Template: Story<AppToolbarProps> = (args) => <AppToolbar {...args} />;

export const Default = Template.bind({});
Default.args = appToolbarData;

export const LoadingUser = Template.bind({});
LoadingUser.args = {
  ...appToolbarData,
  isLoadingUser: true,
  user: undefined,
};

export const NoUser = Template.bind({});
NoUser.args = {
  ...appToolbarData,
  user: undefined,
};
