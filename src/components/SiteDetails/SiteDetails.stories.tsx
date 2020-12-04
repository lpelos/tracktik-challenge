import React from "react";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import { contactDetailsData } from "../ContactDetails/ContactDetails.stories";
import SiteDetails, { SiteDetailsProps } from ".";

export default {
  title: "SiteDetails",
  component: SiteDetails,
  excludeStories: /.*Data$/,
} as Meta;

export const siteDetailsData: Omit<SiteDetailsProps, "onBackButtonClick"> = {
  data: {
    address: {
      city: "Haleyport",
      country: "Sao Tome and Principe",
      state: "New Hampshire",
      street: "851 Isabelle Key",
      zipCode: "30499",
    },
    contact: contactDetailsData.data,
    id: "pCGuMv5F92",
    images: [
      "http://lorempixel.com/640/480/city/Book-Shop-1",
      "http://lorempixel.com/640/480/city/Book-Shop-2",
      "http://lorempixel.com/640/480/city/Book-Shop-3",
    ],
    title: "Books Shop",
  },
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
