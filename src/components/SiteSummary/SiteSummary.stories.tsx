import React from "react";

import { Meta, Story } from "@storybook/react";

import SITE_DATA from "../../__fixtures__/site-data.fixture";
import SiteSummary, { SiteSummaryProps } from ".";

export default {
  title: "SiteSummary",
  component: SiteSummary,
  excludeStories: /.*Data$/,
} as Meta;

export const siteSummaryData: SiteSummaryProps = {
  data: SITE_DATA,
};

const Template: Story<SiteSummaryProps> = (args) => <SiteSummary {...args} />;

export const Default = Template.bind({});
Default.args = siteSummaryData;

export const Dark = Template.bind({});
Dark.args = { ...siteSummaryData, dark: true };
Dark.decorators = [
  (story) => <div style={{ backgroundColor: "black" }}>{story()}</div>,
];
