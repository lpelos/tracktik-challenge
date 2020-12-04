import React from "react";

import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";

import SiteList, { SiteListProps } from ".";
import { siteDetailsData } from "../SiteDetails/SiteDetails.stories";

export default {
  title: "SiteList",
  component: SiteList,
  excludeStories: /.*Data$/,
} as Meta;

export const siteListData: Omit<SiteListProps, "onClickItem"> = {
  data: [
    siteDetailsData.data,
    {
      address: {
        city: "Lake Lulu",
        country: "Bahamas",
        state: "Colorado",
        street: "42082 Audra Ports",
        zipCode: "87327",
      },
      contact: {
        address: { city: "", country: "", state: "", street: "", zipCode: "" },
        email: "",
        id: "mT6snFqVS9",
        jobTitle: "",
        name: "Violet Sanford",
        phoneNumber: "",
      },
      id: "Vcz1RNdIEl",
      images: ["http://lorempixel.com/640/480/city/Grocery-HQ-1"],
      title: "Grocery HQ",
    },
    {
      address: {
        city: "Deckowfort",
        country: "El Salvador",
        state: "Connecticut",
        street: "40545 Jenkins Hollow",
        zipCode: "51865",
      },
      contact: {
        address: { city: "", country: "", state: "", street: "", zipCode: "" },
        email: "",
        id: "4at6b3Ok-L",
        jobTitle: "",
        name: "Providenci Hamill",
        phoneNumber: "",
      },
      id: "CJsE0glVgi",
      images: ["http://lorempixel.com/640/480/city/Books-Garage-1"],
      title: "Books Garage",
    },
  ],
};

export const siteListActionData: Pick<SiteListProps, "onClickItem"> = {
  onClickItem: action("onClickItem"),
};

const Template: Story<SiteListProps> = (args) => <SiteList {...args} />;

export const Default = Template.bind({});
Default.args = { ...siteListData, ...siteListActionData };
